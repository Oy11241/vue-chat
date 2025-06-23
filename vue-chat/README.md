# Vue Chat App

Vue + TypeScript + Firebase を用いたリアルタイムチャットアプリです。  
Vuetify を用いて UI を整え、Firestore を使ってリアルタイムなメッセージ送受信を実現しています。  
Vue と typeScript の学習を目的として作成しました。

## 🔧 使用技術

- **Vue 3**
- **TypeScript**
- **Vuetify**
- **Firebase**
- **その他必要なライブラリ**

## 📸 画面一覧

### 🏠 チャットルーム一覧画面

- 参加可能なチャットルームを一覧表示
- チャットルームの作成機能
- 各チャットルームをクリックで詳細画面に遷移
- Firestore からリアルタイムでルーム一覧を取得

### 💬 チャットルーム画面

- 選択したルーム内でのチャット機能
- メッセージの送信・表示（リアルタイム）
- ユーザー名・送信時刻付きでのメッセージ表示
- Firestore に新規メッセージを追加
- メッセージ入力欄 + 投稿・クリアボタン

### 🔐 ログイン画面

- Firebase Authentication によるメールアドレス + パスワード認証
- ログイン後はチャット画面へ遷移

### 📝 新規登録画面

- 新規ユーザー登録フォーム
- Firebase によるアカウント作成・保存
- 新規登録後はログイン画面へ遷移

## 🚀 起動方法

### 1. リポジトリをクローン

```bash
git clone https://github.com/Oy11241/vue-chat.git
```

### 2. Firebase 設定を追加

src/firebase/firebase.ts に Firebase プロジェクトの構成情報を記述してください。

```bash
// firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  ...
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

```

### 3. 依存関係をインストール

```bash
npm install
```

### 4. 開発サーバーを起動

```bash
npm run dev
```

## 📁 ディレクトリ構成

```bash
src/
│  App.vue             # ルートコンポーネント
│  index.css           # グローバルスタイル
│  main.ts             # アプリのエントリポイント
│
├─components
│  ├─layouts
│  │      Sidebar.vue  # サイドメニュー
│  └─modal
│         CreateRoom.vue # ルーム作成モーダル
│
├─firebase
│      firebase.ts     # Firebaseの初期設定
│
├─plugins
│      index.ts        # VuetifyやRouterの統合
│      vuetify.ts      # Vuetify設定
│
├─router
│      index.ts        # ルーティング定義
│
└─views
       ChatBoard.vue   # チャットルーム画面
       Login.vue       # ログイン画面
       RoomList.vue    # チャットルーム一覧画面
       SignUp.vue      # 新規登録画面
```

## 💡 今後の予定

- チャットルームごとのメンバー表示と退出機能の実装
- 画像・ファイルの添付機能
- プロフィール画像の変更機能
- モバイル UI の改善・レスポンシブ対応
