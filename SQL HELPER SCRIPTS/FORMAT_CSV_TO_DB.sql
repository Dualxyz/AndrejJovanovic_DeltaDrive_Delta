Use [ImportSQLTESTDB];
ALTER TABLE dbo.delta DROP COLUMN column8;
UPDATE dbo.delta SET pricePerKM = LEFT(pricePerKM, LEN(pricePerKM) - 3);
UPDATE dbo.delta SET startPrice = LEFT(startPrice, LEN(startPrice) - 3);
ALTER TABLE dbo.delta ADD tempStartPrice float
UPDATE dbo.delta SET tempStartPrice = TRY_CAST(startPrice AS float);
ALTER TABLE dbo.delta DROP COLUMN startPrice
EXEC sp_rename 'dbo.delta.tempStartPrice', 'StartPrice';

ALTER TABLE dbo.delta ADD tempPricePerKM float
UPDATE dbo.delta SET tempPricePerKM = TRY_CAST(pricePerKM AS float);
ALTER TABLE dbo.delta DROP COLUMN pricePerKM
EXEC sp_rename 'dbo.delta.tempPricePerKM', 'PricePerKM';

ALTER TABLE dbo.delta ADD Id UNIQUEIDENTIFIER DEFAULT NEWID() NOT NULL;

SELECT TOP (1000) * FROM dbo.delta