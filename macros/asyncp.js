// Generated by SugarLisp v0.6.5
exports["awaitp"] = function(forms) {
  var macrodef = ["macro", ["result", "promisecall", "then", "error"],
    ["->", ["~", "promisecall"],
      [
        ["dotprop", "then", ["function", [
            ["~", "result"]
          ],
          ["~", "then"]
        ]],
        ["function", ["err"],
          ["~", "error"]
        ]
      ]
    ]
  ];
  return this.macroexpand(forms, macrodef);
};
exports["asyncp"] = function(forms) {
  var macrodef = ["macro", ["func", "...rest"],
    ["function", ["~", "rest"]]
  ];
  return this.macroexpand(forms, macrodef);
};