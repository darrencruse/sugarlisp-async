// Generated by SugarLisp v0.6.0
exports["awaitcb"] = function(forms) {
  var macrodef = ["macro", ["result", "asynccall", "then", "error"],
    [
      ["~@", "asynccall"],
      ["function", ["err", ["~", "result"]],
        ["if", "err", ["~", "error"],
          ["~", "then"]
        ]
      ]
    ]
  ];
  return this.macroexpand(forms, macrodef);
};
exports["asynccb"] = function(forms) {
  var macrodef = ["macro", ["func", "...rest"],
    ["function", ["~", "rest"]]
  ];
  return this.macroexpand(forms, macrodef);
};