// Generated by SugarLisp v0.5
exports["awaitsync"] = function(forms) {
  var macrodef = ["macro", ["result", "asynccall", "then", "error"],
    ["try", ["var", ["~", "result"],
        ["str", ["~", [
          [".", "sl", "valueOfStr"],
          ["get", 0, "asynccall"]
        ]], "'Sync'"]
      ],
      ["~", "then"],
      ["function", ["err"],
        ["~", "error"]
      ]
    ]
  ];
  return this.macroexpand(forms, macrodef);
};
exports["sync"] = function(forms) {
  var macrodef = ["macro", ["func", "...rest"],
    ["function", ["~", "rest"]]
  ];
  return this.macroexpand(forms, macrodef);
};