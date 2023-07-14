# アプリケーション名
お天気コーデ

# アプリケーション概要
赤ちゃんがいる家庭向けのアプリです。
ユーザー情報から天気情報を取得して最適な服を提案してくれます。

# URL
https://first-myapp.onrender.com

# テスト用アカウント
・Basic認証パスワード：292929  
・Basic認証ID: adminmin  
・メースアドレス：tokyo@mail  
・パスワード：1000000  
# 利用方法
１、ユーザの情報を登録してください。  
２、メイン画面のボタンを押す事で地域の天気表示と最適な服の説明とイメージ画像の服が表示されます。

# アプリケーションを作成した背景
現在、共に子育て中の妻に課題をヒアリング行い、赤ちゃんが着る服を考えるのが大変という課題が見つかりました。課題を深掘りしていく内に「赤ちゃんは体温調節ができない」が真因と考え、仮説として1日の天気情報から条件を割り出して洋服を選定してくれることができれば解決できると考えて開発に至りました。

# 洗い出した要件
[要件を定義したシート](https://docs.google.com/spreadsheets/d/1aGhZOIcfeoCKE2zAu8vCCwt9wB_ML2-7Pi7l_WJa96w/edit#gid=982722306)

# 実装した機能についての画像やGIFおよびその説明
[![Image from Gyazo](https://i.gyazo.com/0807d5021f5e5aaf7d5516d8d1513a51.gif)](https://gyazo.com/0807d5021f5e5aaf7d5516d8d1513a51)

# 実装予定の機能
現在、細かい修正を行なった後に画像の投稿と編集、削除機能を実装していきます。

# データベース設計
[![Image from Gyazo](https://i.gyazo.com/b39f3ee0e9f77b36baeaa8999107d0ac.png)](https://gyazo.com/b39f3ee0e9f77b36baeaa8999107d0ac)

# 画面遷移図
[![Image from Gyazo](https://i.gyazo.com/e29ef5ab9f703aaa2598191dcfade56c.png)](https://gyazo.com/e29ef5ab9f703aaa2598191dcfade56c)

# 開発環境
・ruby on rails  
・javascript  
・GitHub  
・Visual Studio Code 
・render  
・MySQL  
・PostgreSQL  
・OpenWeatherAPI  

# ローカルでの動作方法
以下のコマンド順に実行  
% git clone https://github.com/koginomama/myfirst_app.git  
% cd myfirst_app  
% bundle install  
% yarn install  

# 工夫したポイント
APIの使用と非同期通信によるビューの表示を行えるように工夫しました。  
初めてAPIの取得を行なったので表示させるまでが大変でした。  
郵便番号だけでは一部でしか取得できないこともわかり、郵便番号からさらに緯度と経緯を取得するAPIを使用することによって正確な位置情報の取得ができるようになりました。  
非同期通信についてもまだ理解が浅い部分があり、カリキュラムを見直したり、他の方の資料を参考にさせてもらい、ボタンを押して情報を即時に取得できる実装も工夫できたポイントだと思っております。  
  

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