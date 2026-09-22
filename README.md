# 🚀 Separation steps


### `admin.js`

in `admin.js` add these configurations

```
url: "/", // admin served from the root of the static host
autoOpen: env.bool("AUTO_OPEN_ADMIN_PANEL", false),
serveAdminPanel: env.bool('SERVE_ADMIN_PANEL', true),  
// should be false in .env
```

### `.env`

in `.env` add these variables with these values

```
PUBLIC_URL=http://localhost:1337


SERVE_ADMIN_PANEL=true

# on startup
AUTO_OPEN_ADMIN_PANEL=false
```

### `middlewares.js`

add dashboard domain to CORS origins

```
origin: [process.env.ADMIN_URL || 'http://admin.local'],
```

## ⚙️ Deployment

1. run this command to set dashboard right API url 

```bash
$env:STRAPI_ADMIN_BACKEND_URL = "http://localhost:1337"
```

> This is very important to forward API call to actual server

2. Build strapi project 
3. Create IIS website 
4. Move build output (static files) to IIS site location
5. start strapi project 

```
npm run start
```

6. add this web config with these rules 

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>

  <system.webServer>

    <staticContent>
      <remove fileExtension=".json" />
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <remove fileExtension=".woff" />
      <mimeMap fileExtension=".woff" mimeType="font/woff" />
      <remove fileExtension=".woff2" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
      <remove fileExtension=".svg" />
      <mimeMap fileExtension=".svg" mimeType="image/svg+xml" />
      <remove fileExtension=".webmanifest" />
      <mimeMap fileExtension=".webmanifest" mimeType="application/manifest+json" />
      <remove fileExtension=".mjs" />
      <mimeMap fileExtension=".mjs" mimeType="text/javascript" />
    </staticContent>

    <rewrite>
      <rules>
        <rule name="SPA fallback" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>

    <urlCompression doStaticCompression="true" doDynamicCompression="false" />

  </system.webServer>

  <location path="assets">
    <system.webServer>
      <staticContent>
        <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="365.00:00:00" />
      </staticContent>
    </system.webServer>
  </location>

  <location path="index.html">
    <system.webServer>
      <staticContent>
        <clientCache cacheControlMode="DisableCache" />
      </staticContent>
    </system.webServer>
  </location>

</configuration>
```


Make sure you clear build output & cache every time you deploy

```
Remove-Item -Recurse -Force .\dist -ErrorAction SilentlyContinue

Remove-Item -Recurse -Force .\.cache -ErrorAction SilentlyContinue
```