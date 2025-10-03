# BMS Class Diagram - Definitive Version

This class diagram represents the Django models for the Bakery Management System (BMS), mapping to the MySQL `bakery_db` tables. It includes current models (`User`, `Ingredient`, `Production`, `Sale`), relationships (`Sale.product_id`, `Sale.user_id`, `Production.user_id`), and a `Recipe` model for ingredient usage. 

**Status**: Current models implemented; Follow this diagram for updates.

## Class Diagram

```mermaid
classDiagram
    class User {
        +int id PK
        +string username UK
        +string password
        +enum role {manager, staff}
    }
    class Ingredient {
        +int id PK
        +string name
        +decimal stock
        +decimal reorder_point
    }
    class Production {
        +int id PK
        +string product_name
        +int quantity
        +date production_date
        +User user_id "planned: who logged production"
    }
    class Sale {
        +int id PK
        +string order_id UK
        +string product_name
        +int quantity
        +decimal total
        +enum status {pending, paid, shipped}
        +date sale_date
        +Production product_id "planned: references Production.id "
        +User user_id "planned: who made sale "
    }
    class Recipe {
        +int id PK
        +Production production_id "references Production.id "
        +Ingredient ingredient_id "references Ingredient.id "
        +decimal quantity_used
    }
    Sale --> Production : "planned: product_id"
    Sale --> User : "planned: user_id"
    Production --> User : "planned: user_id"
    Recipe --> Production : production_id
    Recipe --> Ingredient : ingredient_id