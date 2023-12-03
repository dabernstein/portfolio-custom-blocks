const {MediaUpload, InspectorControls} = wp.blockEditor;
const {Button, PanelBody, PanelRow, ColorPicker, TextareaControl} = wp.components;

wp.blocks.registerBlockType('portfolio/custom-block',{
    title: "About Me Block",
    icon: 'hammer',
    category: 'design',
    attributes: {
        aboutText: { 
          type: 'string',
          default: '',
        },
        image: {
          type: 'string',
          default: null
        },
        color: {
          type: "string",
          default: "#FFFFFF"
        }
    },
    edit: function(props) {
        function updateText(newText) { props.setAttributes({aboutText: newText})}

        function onImageSelect(selectedImage) { props.setAttributes({image: selectedImage.url})}

        function setColor(color) { props.setAttributes({color: color})} 

        return (
          React.createElement("div", {className: "outer-container"},
            React.createElement(InspectorControls, null, 
              React.createElement(PanelBody, {title: "Block Settings", initialOpen: true},
                React.createElement(PanelRow, null,
                  React.createElement("label", { className: "sidebarHeading"}, "Color")
                ),
                React.createElement(PanelRow, null,
                  React.createElement(ColorPicker, {
                    color: props.attributes.color,
                    defaultValue: "#FFFFFF",
                    enableAlpha: true,
                    onChange: setColor
                  })
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
                className: "text-content-container container",
              }, 
                React.createElement(TextareaControl, {
                  label: "About me text",
                  value: props.attributes.aboutText,
                  rows: 10,
                  onChange: updateText
                })
              )
            )
          ));
    },
    save: function(props) {
        return (
          React.createElement("div", {className: "portfolio-container"},
            React.createElement("div", {
              className: "image-container"
            }, 
              React.createElement("figure", {
                style: {
                  backgroundColor: props.attributes.color
                }
              },
                React.createElement("img", {
                  className: "about-image",
                  src: props.attributes.image
                })
              )
            ),
            React.createElement("div", {className: "about-text-container"},
              React.createElement("p", null, props.attributes.aboutText)
            )
          )
        );
    }
})