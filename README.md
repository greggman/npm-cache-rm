# npm-cache-rm

Removes entries from the npm cache

## Usage

```
npm-cache-rm [--dry-run] <regex>
```

removes any entry that matches <regex>.

## Example

### List entries that match "electron"

```
npm-cache-rm --dry-run electron
```

result

```
rm make-fetch-happen:request-cache:https://registry.npmjs.org/electron-publish/-/electron-publish-22.3.2.tgz
rm pacote:tag-manifest:https://registry.npmjs.org/electron/-/electron-10.0.0.tgz:sha512-0XX/LqYAHHCSbfLjUk9VRDPOeYjDPEzA9i7F50AqpEpFIWR2bp++0S0beRANUpPdkvtBDp+0R6vHV3iXPvuKyA==
rm make-fetch-happen:request-cache:https://registry.npmjs.org/electron/-/electron-10.0.0.tgz
rm make-fetch-happen:request-cache:https://registry.npmjs.org/electron-download/-/electron-download-4.1.1.tgz
rm pacote:tag-manifest:https://registry.npmjs.org/electron/-/electron-9.2.0.tgz:sha512-4ecZ3rcGg//Gk4fAK3Jo61T+uh36JhU6HHR/PTujQqQiBw1g4tNPd4R2hGGth2d+7FkRIs5GdRNef7h64fQEMw==
rm make-fetch-happen:request-cache:https://registry.npmjs.org/electron-context-menu/-/electron-context-menu-2.3.0.tgz
```

### Remove Electron 10.0.0

```
npm-cache-rm "electron.*?10\.0\.\0"
```

## Disclaimer, Notes

I'm not a node expert but it worked for me. I wanted to be to test some issues
I'm running into with packages without clearing the entire cache so I threw this
together. I also wanted to keep the dependencies low so I didn't add a bunch of
libraries for globing or argument parsing etc...

## Licence: [MIT](LICENSE.md)
