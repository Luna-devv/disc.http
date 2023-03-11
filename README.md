# Bot Stats (linked role)

This repository contains the documentation and source for a linked role bot that shows the biggest bot of a user in their profile.
> ![image](https://user-images.githubusercontent.com/71079641/224494178-c316fb5a-efd8-42ef-bb1a-f60405246651.png)

## Project structure
All of the files for the project are on the left-hand side. Here's a quick glimpse at the structure:

```
├── assets    -> Images used in this tutorial
├── src
│   ├── common
│   │   ├── config.ts   -> Parsing of local configuration
│   │   └── storage.ts  -> Provider for storing OAuth2 tokens and bot ids
│   ├── scripts
│   │   └── register.ts -> Tool to register the metadata schema
│   ├── structures
│   │   └── user.ts -> Mongo database schema for users
│   ├── wrappers
│   │   ├── discord.ts    -> Discord specific auth & API wrapper
│   │   └── dblstats.ts   -> dblstatistics.com specific auth & API wrapper
│   ├── server.ts -> Main entry point for the application
│   ├── types.ts  -> All the typescript interfaces
├── .env  -> your credentials and IDs
├── .gitignore
├── package.json
└── README.md
```

### Setup project

First clone the project:
```
git clone https://github.com/Luna-devv/linked-roles-sample.git
```

Then navigate to its directory, install dependencies and compile:
```
cd linked-roles-sample
yarn install
yarn tsc
```

### Get app credentials

Fetch the credentials from your app's settings and add them to a `.env` file. You'll need your bot token (`DISCORD_TOKEN`), client ID (`DISCORD_CLIENT_ID`), client secret (`DISCORD_CLIENT_SECRET`). You'll also need a redirect URI (`DISCORD_REDIRECT_URI`) and a randomly generated UUID (`COOKIE_SECRET`), which are both explained below:

```
MONGO_URL: <mongo connection string>
TOPGG_TOKEN: <dblstatistics.com token>
DISCORD_CLIENT_ID: <OAuth2 client Id>
DISCORD_CLIENT_SECRET: <OAuth2 client secret>
DISCORD_TOKEN: <bot token>
DISCORD_REDIRECT_URI: https://<your-project-url>/discord-oauth-callback
COOKIE_SECRET: <random generated UUID>
```

For the UUID (`COOKIE_SECRET`), you can run the following commands:
```bash
$ node
crypto.randomUUID()
```

### Running your app

After your credentials are added, you can run your app:
```bash
$ node .
```

And, just once, you need to register you connection metadata schema. In a new window, run:
```bash
$ npm run register
```

And, if you are wanting to develop on it and change code. In a new window, run:
```bash
yarn tsc --watch
```

### Set up interactivity

The project needs a public endpoint where Discord can send requests. To develop and test locally, you can use something like [`ngrok`](https://ngrok.com/) to tunnel HTTP traffic.

Install ngrok if you haven't already, then start listening on port `3000`:

```
$ ngrok http 3000
```

You should see your connection open:

```
Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://1234-someurl.ngrok.io -> localhost:3000
Forwarding                    https://1234-someurl.ngrok.io -> localhost:3000

Connections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Copy the forwarding address that starts with `https`, in this case `https://1234-someurl.ngrok.io`, then go to your [app's settings](https://discord.com/developers/applications).

On the **General Information** tab, there will be an **Linked Roles Verification URL**. Paste your ngrok address there, and append `/linked-role` (`https://1234-someurl.ngrok.io/linked-role` in the example).

You should also paste your ngrok address into the `DISCORD_REDIRECT_URI` variable in your `.env` file, with `/discord-oauth-callback` appended (`https://1234-someurl.ngrok.io/discord-oauth-callback` in the example). Then go to the **General** tab under **OAuth2** in your [app's settings](https://discord.com/developers/applications), and add that same address to the list of **Redirects**.

Click **Save Changes** and restart your app.

## Other resources
- Read **[the tutorial](https://discord.com/developers/docs/tutorials/configuring-app-metadata-for-linked-roles)** for in-depth information.
- Join the **[Someone's server](https://discord.gg/yYd6YKHQZH)**  to ask questions about this project and other dev related talk.
- Join the **[Discord Developers server](https://discord.gg/discord-developers)** to ask questions about the API, attend events hosted by the Discord API team, and interact with other devs.
