# React GrapesJS
  
This library is React wrapper of popular Web Builder Framework library [GrapesJS](https://github.com/artf/grapesjs)
  
## Install
```
# yarn
yarn add react-grapesjs

# npm
npm i react-grapesjs --save
```

## Testing
```
yarn test
```

## Use the package
```
import {Editor} from 'react-grapesjs';
import 'grapesjs/dist/grapes.min.css';
```

## Run example
```
yarn start
```

## Hooks
- **onInit** : called after editor is initialized.
- **onDestroy** : called before editor is destroyed.
- **onUpdate** : called on every change in editor.
