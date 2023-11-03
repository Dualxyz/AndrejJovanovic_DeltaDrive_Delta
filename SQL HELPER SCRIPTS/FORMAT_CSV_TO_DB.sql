Use dbo.Drivers;
ALTER TABLE dbo.Drivers DROP COLUMN column8;
UPDATE dbo.Drivers SET pricePerKM = LEFT(pricePerKM, LEN(pricePerKM) - 3);
UPDATE dbo.Drivers SET startPrice = LEFT(startPrice, LEN(startPrice) - 3);
ALTER TABLE dbo.Drivers ADD tempStartPrice float
UPDATE dbo.Drivers SET tempStartPrice = TRY_CAST(startPrice AS float);
ALTER TABLE dbo.Drivers DROP COLUMN startPrice
EXEC sp_rename 'dbo.Drivers.tempStartPrice', 'StartPrice';

ALTER TABLE dbo.Drivers ADD tempPricePerKM float
UPDATE dbo.Drivers SET tempPricePerKM = TRY_CAST(pricePerKM AS float);
ALTER TABLE dbo.Drivers DROP COLUMN pricePerKM
EXEC sp_rename 'dbo.Drivers.tempPricePerKM', 'PricePerKM';

ALTER TABLE dbo.Drivers ADD Id UNIQUEIDENTIFIER DEFAULT NEWID() NOT NULL;

SELECT TOP (1000) * FROM dbo.Drivers