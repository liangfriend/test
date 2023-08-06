let data = null;

const grace = (config) => {
  data = config;
  parseCurlyBracket();
  bindingModel();
};

function bindingModel() {
  const input = document.querySelector('input[data-model]');
  const property = input.getAttribute('data-model');

  input.addEventListener('input', function(event) {
    data[property] = event.target.value;
    updateView();
  });
}

function parseCurlyBracket() {
  const doc = document.querySelector('panel');
  const str = doc.innerHTML;
  const content = replaceBracket(str);
  doc.innerHTML = content;
}

function replaceBracket(str) {
  const content = str.replace(/\{\{(.+)\}\}/g, (args) => {
    return getValue(args);
  }).replace('data-model','value');
  return content;
}

function getValue(key) {
  return key.split('.').reduce((data, currentValue) => {
    return data[currentValue.slice(2, -2)];
  }, data.data);
}

function updateView() {
  const input = document.querySelector('input[data-model]');
  const property = input.getAttribute('data-model');
  input.value = data[property];
}

const setState = (value) => {
  // console.log(value)
};

export { setState, grace };