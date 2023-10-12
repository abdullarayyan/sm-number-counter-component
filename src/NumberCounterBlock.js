import React, { useEffect } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

const GrapesJSEditor: React.FC = () => {
  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      fromElement: true,
      storageManager: {
        type: 'local',
      },
      plugins: ['gjs-blocks-basic'],
    });

    // Define the NumberCounter component
    editor.DomComponents.addType('number-counter', {
      model:{
        defaults: {
            traits: [
              {
                type: 'number',
                name: 'start',
                label: 'Start Value',
                default: 0, // Default value for the trait
              },
              {
                type: 'number',
                name: 'end',
                label: 'End Value',
                default: 100, // Default value for the trait
              },
              {
                type: 'number',
                name: 'speed',
                label: 'Speed (ms)',
                default: 1000, // Default value for the trait
              },
              {
                type: 'select',
                name: 'direction',
                label: 'Direction',
                options: [
                  { value: 'up', name: 'Up' },
                  { value: 'down', name: 'Down' },
                ],
                default: 'up', // Default value for the trait
              },
            ],
        }
      },
    });
    editor.BlockManager.add('number-counter-block', {
      label: 'NumberCounter',
      attributes: { class: 'fa fa-clock-o' },
      content: '<div data-gjs-type="number-counter" data-gjs-draggable="true">0</div>',
    });
   
    // editor.on('block:drag:start', (block) => { 
    //   console.log(block,'start')
    //  });
    //  editor.on('block:drag', (block) => { 
    //   console.log(block,'drag')
    //   });
    // const modal = editor.Modal;
    // console.log(modal)
      // editor.on('block:drag:stop', (component, block) => { 
      //   console.log(block,component.traits,'stop')
      //   if (component.is('number-counter')) {
      //     // Add your logic to set up the counter component here
      //     // const start = component.getTrait('start').get('default');
      //     // const end = component.getTrait('end').get('default');
      //     // const speed = component.getTrait('speed').get('default');
      //     // const direction = component.getTrait('direction').get('default');
  
      //     // // Your logic to set up the counter based on traits
      //     // console.log('Start:', start, 'End:', end, 'Speed:', speed, 'Direction:', direction);
      //   }
      //  });


    // // Handle the event after a component is dragged and dropped
    // editor.on('component:drag:end', (component) => {
    //   console.log(component)
    //   if (component.is('number-counter')) {
    //     // Add your logic to set up the counter component here
    //     const start = component.getTrait('start').get('value');
    //     const end = component.getTrait('end').get('value');
    //     const speed = component.getTrait('speed').get('value');
    //     const direction = component.getTrait('direction').get('value');

    //     // Your logic to set up the counter based on traits
    //     console.log('Start:', start, 'End:', end, 'Speed:', speed, 'Direction:', direction);
    //   }
    // });
    

    editor.on('block:drag:stop', (component) => {
      if (component.is('number-counter')) {
        // Get the trait values

        let start = component.getTrait('start').get('default');
        let end = component.getTrait('end').get('default');
        let speed = component.getTrait('speed').get('default');
        let direction = component.getTrait('direction').get('default');
        console.log('Start:', start, 'End:', end, 'Speed:', speed, 'Direction:', direction);

        // Access the counter component
        const counterElement = component.view.el;

        // Reset the counter's content
        counterElement.innerHTML =  start ;

        // Function to update the counter
        const updateCounter = () => {
          console.log('Start:', start, 'End:', end, 'Speed:', speed, 'Direction:', direction);

          const current = parseInt(counterElement.innerHTML, 10);
          console.log(current,'current')
          if ((direction === 'up' && current < end)) {
            console.log('up')
            counterElement.innerHTML = direction === 'up' ? current + 1 : current - 1;
            setTimeout(updateCounter, speed);
          }
          if((direction === 'down' && current > end)){
            console.log('down')
            counterElement.innerHTML =  current - 1;
            setTimeout(updateCounter, speed);
          }
        };

        // Start the counter
        updateCounter();
        ['start', 'end', 'speed', 'direction'].forEach((traitName) => {
          component.getTrait(traitName).on('change:value', (e) => {
        
            const startInput = component.getTrait('start').get('value');
            const endInput = component.getTrait('end').get('value');
            const speedInput = component.getTrait('speed').get('value');
            const directionInput = component.getTrait('direction').get('value');

            counterElement.innerHTML = component.getTrait('start').get('value');

            if (editor) {
              const component = editor.getSelected();
              if (component && component.is('number-counter')) {
                component.getTrait('start').set('default', startInput);
                component.getTrait('end').set('default', endInput);
                component.getTrait('speed').set('default', speedInput);
                component.getTrait('direction').set('default', directionInput);

                direction = component.getTrait('direction').get('default');
                start = component.getTrait('start').get('default')
                end = component.getTrait('end').get('default');
                speed = component.getTrait('speed').get('default');
                updateCounter();
              }
            }
          });
        });
      }
    });
    // const initialComponent = editorInstance.getSelected();
    // if (initialComponent && initialComponent.is('number-counter')) {
    //   startCounter(initialComponent);
    // }
  }, []);
  

  return (
    <div>
      <div id="gjs" style={{ height: '500px' }}></div>
      <div id="blocks" style={{ display: 'none' }}></div>
    </div>
  );
};

export default GrapesJSEditor;