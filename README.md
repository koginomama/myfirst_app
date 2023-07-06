# README

# テーブル設計

## users テーブル

| Column             | Type   | Options                  |
| ------------------ | ------ | -----------------------  |
| baby_name          | string | null: false              |
| email              | string | null: false unique: true |
| encrypted_password | string | null: false              |
| postal_code        | string | null: false              |
| gender             | string | null: false              |

### Association

- has_many :garments


## garments テーブル
| Column                       | Type       | Options                       |
| ---------------------------  | ------     | ----------------------------- |
| image_name                   | string     | null: false                   |
| content                      | text       | null: false                   |
| user                         | references | null: false foreign_key: true |

- image用テーブルも用意

### Association

- belongs_to :user