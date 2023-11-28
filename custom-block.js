const {MediaUpload, InspectorControls} = wp.blockEditor;
const {Button, PanelBody, PanelRow} = wp.components;

wp.blocks.registerBlockType('portfolio/custom-block',{
    title: "About Me Block",
    icon: 'hammer',
    category: 'design',
    attributes: {
        name: { 
          type: 'string' 
        },
        image: {
          type: 'string',
          default: null
        },
        color: {
          
        }
    },
    edit: function(props) {
        function updateName(event) { props.setAttributes({name: event.target.value})}

        function onImageSelect(selectedImage) { props.setAttributes({image: selectedImage.url})}

        function newColor(event) { props.setAttributes({color: event.target.value})}

        return (
          React.createElement("div", {className: "outer-container"},
          React.createElement(InspectorControls, null, 
            React.createElement(PanelBody, {title: "Block Settings"},
              React.createElement(PanelRow, null, 
                React.createElement("input", {
                  type: "color",
                  value: props.attributes.color,
                  onChange: newColor
                }),
              )
            )
          ),
            React.createElement("div", {
              className: "about-container"
            }, 
              React.createElement("div", {
                className: "image-upload-container container"
              }, 
                React.createElement("label", null, "Image"), 
                React.createElement("div", {className: "image-upload"},
                  props.attributes.image ? React.createElement("img", {
                    src: props.attributes.image,
                    alt: "Selected Image",
                    className: "uploaded-image"
                  }) : 
                  React.createElement("div", null, "Select an Image")
                ),
                React.createElement(MediaUpload, {
                  onSelect: onImageSelect,
                  type: "image",
                  render: ({open}) => (
                    React.createElement(Button, {
                      onClick: open,
                      className: "button large-button"
                    },
                    props.attributes.image ? 'Change Image' : 'Select Image'
                    )
                  )
                })
              ), 
              React.createElement("div", {
                className: "text-content-container container"
              }, 
                React.createElement("label", null, "Name: "),
                React.createElement("input", {
                  type: "text",
                  value: props.attributes.name,
                  placeholder: "name",
                  onChange: updateName
                })
              )
            )
          ));
    },
    save: function(props) {
        return (
          React.createElement("div", {className: "portfolio-container"},
            React.createElement("div", {className: "image-container"}, 
              React.createElement("figure", null,
                React.createElement("img", {
                  className: "about-image",
                  src: props.attributes.image
                })
              )
            ),
            React.createElement("div", {className: "name-container"},
              React.createElement("h2", null, props.attributes.name)
            )
          )
        );
    }
})