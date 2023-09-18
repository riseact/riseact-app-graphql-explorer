# riseact-app-template-node

This is a template for a Node.js application using [Express](https://expressjs.com/) and [RiseactSDK](https://github.com/riseact/riseact-node-sdk).

## Getting started

### Quick start (partners only)

⚠ **Currently Riseact CLI is available only for Riseact Partners. If you have an organization, you need to follow the manual installation steps.**

To create a new application using this template, you need to install the [Riseact CLI](https://github.com/riseact/cli).

```bash
python3 -m pip install riseact-cli
```

After installing the CLI, login using your Riseact account. Make sure that you are logged in as a Riseact Partner.

```bash
riseact auth login
```

Now you can create a new application using this template.

```bash
riseact app init
```

Follow the instructions, select `Node` as template and wait for the application to be created.<br>
The CLI will automatically open the application in your browser.<br>
The application will automatically reload when you make changes to the source code. Enjoy! 

### Create your application manually

Clone the repository

```bash
git clone --recurse-submodules https://github.com/riseact/riseact-app-template-node.git
```

Go to the project directory
```
cd riseact-app-template-node
```

Install dependencies
```
npm install
```

Create a new application in Riseact admin panel and generate the `CLIENT_ID` and `CLIENT_SECRET` from the application settings.<br>
Create a `.env` file in the root of your project and add the following lines:
    
```
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
```
<br>
Sign up for a Ngrok account and download the Ngrok CLI. You can find the download links [here](https://ngrok.com/download).<br>
Now you can start the Ngrok tunnel with the following command:

```bash
npm run start:tunnel
```

Copy the HTTPS forwarding URL (something like `https://4f70-2001-b07-5d30-e9f4-59e2-e4ae-9861-f0c.eu.ngrok.io`) from the terminal. Append **/oauth/callback** to the URL and add it to the **Allowed redirection URL(s)** field in Riseact admin panel.<br>

Start the application
```
npm run dev
```

The application will be available at the ngrok tunnel URL.<br>
The application will automatically reload when you make changes to the source code. Enjoy! 

## Configuration

The variables are initialized by Riseact CLI. The following environment variables are available:

| Name            | Description                          | Default |
| --------------- | ------------------------------------ | ------- |
| `CLIENT_ID`     | The client ID of the application     |         |
| `CLIENT_SECRET` | The client secret of the application |         |

If you didn't use the Riseact CLI to create your application, you need to add these variables to your `.env` file.
You can create the keys in the application settings page in Riseact.


## Simulate the production environment locally

Build your frontend. If you are using the riseact-app-template-node repo, use the command `npm run build:fe`.

In addition, you need to change the static path for the frontend. The default path is intended for working with Docker deployment method. Edit this line on your `index.ts` file:

```typescript
// Original line
app.use(serveStatic(`${process.cwd()}/static`));

// Change the path to 
app.use(serveStatic(`${process.cwd()}/src/frontend/dist)`));
// or wherever your frontend build is located.
```

Now start your app in production mode with the command:

```bash
npm run start:local
```

## Deployment with Docker

To deploy your application with Docker, you need to build the image and run it.

```bash
docker build -t your-organization/your-app-image .
```

Keep in mind that the image will not contain `CLIENT_ID` and `CLIENT_SECRET` environment variables. You need to pass them as arguments when running the container.<br>
Remember to add your app URL to the **Allowed redirection URL(s)** field in Riseact admin panel followed by `/auth/callback` path to get the authentication working.

### Run with Docker

```bash
docker run -p 3000:3000 -e CLIENT_ID=your-client-id -e CLIENT_SECRET=your-client-secret your-organization/your-app-image
```

### Run with Docker Compose

```yml
version: '3.7'

services:
  my-awesome-app:
    image: your-organization/your-app-image
    ports:
      - 3000:3000
    environment:
      CLIENT_ID: your-client-id
      CLIENT_SECRET: your-client-secret
```

## Manual deployment

To deploy your application manually, you need to install the dependencies 

```bash
npm install
```

Build frontend and backend

```bash
npm run build
```

Start the application in production mode

```bash
npm start
```

## License

MIT
