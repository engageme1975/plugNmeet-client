# plugNmeet-client
Frontend UI for [plugNmeet-server](https://github.com/mynaparrot/plugNmeet-server).

To download the latest version check [release page.](https://github.com/mynaparrot/plugNmeet-client/releases). After
download unzip the file. Now rename `dist/assets/config_sample.js` to `dist/assets/config.js`. Change necessary
information inside `dist/assets/config.js` file.

## Login Page & Participant Join

The login page (`login.html`) supports two modes:
- **Participant Mode**: Enter your name to join as a participant
- **Administrator Mode**: Use Keycloak SSO for admin access with full meeting controls

### Default Room Metadata
When a participant creates a new room, it automatically includes comprehensive room features:
- Recording (local and cloud)
- Chat with file uploads
- Shared notepad and whiteboard
- Breakout rooms (up to 6)
- Polls and insights/AI features
- Transcription and translation
- End-to-end encryption configuration
- Screen sharing and RTMP ingress

The room title is automatically set to the room ID for easy identification.

### Translation
Please help us to translate Plug-N-Meet into your language. We're using [crowdin](https://crowdin.com/project/plugnmeet-client) to translate the interface. You can translate directly there. If you don't find your language then please open an issue & we'll add your language ASAP.

**Development**

1) Clone the project & navigate to the directory. Make sure you've nodejs install in your
   PC. https://nodejs.org/en/download/
2) Copy to rename this file:

```
cp src/assets/config_sample.js src/assets/config.js
```

3) Now start server & navigate to http://localhost:3000/login.html

```
pnpm install
pnpm start
// to build
pnpm run build
```
