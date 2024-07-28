window.loadFeature = async function (url, custom_element_name) {
  if (!window.customElements.get(custom_element_name)) {
    var script = document.createElement("script");
    script.id = `init_${custom_element_name}_script`;
    script.type = "module";
    script.src = url;

    document.head.appendChild(script);
  }
};
