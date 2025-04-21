# Readme

初期セットアップと各種設定を保管する。

## 初期設定

```sh
# Bunのインストール
curl -fsSL https://bun.sh/install | bash
# Homebrewのインストール
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
# setup
bun index.ts setup
# bun index.ts setup -e ssh
```

## 更新

```sh
# Bunのアップグレード
bun upgrade
# 設定ファイルの取り込み
bun index.ts dump
# 設定ファイルの適用
bun index.ts apply
```
