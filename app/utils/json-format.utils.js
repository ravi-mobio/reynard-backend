const config = {
  username: "",
  id: "",
  supportedVersion: "",
  screens: [],
  logoUrl:
    "https://firebasestorage.googleapis.com/v0/b/toolbox-suite.appspot.com/o/toolBoxSuitLogoBlocks.png?alt=media&token=96329983-5b44-4494-96d5-80834bedf7b2",
  contactId: "",
  accountId: "",
};

const screen = {
  title: "",
  description: "",
  type: "form",
  screenId: "",
  isSafe: false,
  color: "009E3D",
  iconUrl: "",
  properties: [],
  buttons: [],
};

const properties = {
  type: "options",
  title: "Project",
  selectedOption: null,
  id: "Project_Safe",
  hint: "optional",
  IsRequired: false,
  isSafe: false,
  iconUrl: "",
  default: "",
  options: [],
};

const option = {
  title: "Default Project",
  isVisibleForOptions: null,
  id: "",
  iconUrl: "",
  hasEmptyValue: true,
};

const buttons = {
  title: "Submit",
  color: "009E3D",
  action: null,
};

module.exports = {
  config,
  screen,
  properties,
  option,
  buttons,
};
