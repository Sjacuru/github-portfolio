# BMS Entity-Relationship Diagram (ERD) - Definitive Version

This ERD represents the complete MySQL schema for the Bakery Management System (BMS) database (`bakery_db`), designed for the full system (production to sales). It includes current tables (`Users`, `Ingredients`, `Productions`, `Sales`) relationships (`Sales.product_id`), user tracking (`Sales.user_id`, `Productions.user_id`), and a `Recipes` table for ingredient usage in production. 

**Status**: Current tables implemented; relationships to be added will Follow this diagram for updates.

## ERD

```mermaid
erDiagram
    Users {
        int id PK
        varchar username UK
        varchar password
        enum role "manager, staff"
    }
    Ingredients {
        int id PK
        varchar name
        decimal stock
        decimal reorder_point
    }
    Productions {
        int id PK
        varchar product_name
        int quantity
        date production_date
        int user_id FK "planned: who logged production"
    }
    Sales {
        int id PK
        varchar order_id UK
        varchar product_name
        int quantity
        decimal total
        enum status "pending, paid, shipped"
        date sale_date
        int product_id FK "references Productions.id"
        int user_id FK "who made sale"
    }
    Recipes {
        int id PK
        int production_id FK "references Productions.id"
        int ingredient_id FK "references Ingredients.id"
        decimal quantity_used
    }
    Sales ||--o{ Productions : "product_id"
    Sales ||--o{ Users : "user_id"
    Productions ||--o{ Users : "user_id"
    Recipes ||--o{ Productions : production_id
    Recipes ||--o{ Ingredients : ingredient_id

Implementation Notes





Current Tables: Users, Ingredients, Productions, Sales (defined in dbase/schema.sql).



Planned Relationships:





Sales.product_id to Productions.id: Links sales to production batches.



Sales.user_id to Users.id: Tracks who processed sales.



Productions.user_id to Users.id: Tracks who logged production.



Recipes table: Links Productions to Ingredients for recipe management.



Schema Updates Needed:

USE bakery_db;
Add ALTER TABLE Sales ADD COLUMN product_id INT; 
ALTER TABLE Sales ADD FOREIGN KEY (product_id) REFERENCES Productions(id);.


Similar for user_id columns and Recipes table.



Reporting: Query joins (e.g., Sales + Productions + Users) for sales reports.



Status: Ready for BMS-6 (login). Update this diagram as relationships are implemented.

