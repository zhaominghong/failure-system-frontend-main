module.exports = {
  // 1.一行代码的最大字符数，默认是80(printWidth: <int>)
  printWidth: 100,
  // 2.tab宽度为2空格(tabWidth: <int>)
  tabWidth: 2,
  // 3.是否使用tab来缩进，我们使用空格(useTabs: <bool>)
  useTabs: false,
  // 4.结尾是否添加分号，false的情况下只会在一些导致ASI错误的其工况下在开头加分号，我选择无分号结尾的风格(semi: <bool>)
  semi: false,
  // 5.使用单引号(singleQuote: <bool>)
  singleQuote: true,
  // 6.object对象中key值是否加引号（quoteProps: "<as-needed|consistent|preserve>"）as-needed只有在需求要的情况下加引号，consistent是有一个需要引号就统一加，preserve是保留用户输入的引号
  quoteProps: 'as-needed',
  // 7.在jsx文件中的引号需要单独设置（jsxSingleQuote: <bool>）
  jsxSingleQuote: false,
  // 8.尾部逗号设置，es5是尾部逗号兼容es5，none就是没有尾部逗号，all是指所有可能的情况，需要node8和es2017以上的环境。（trailingComma: "<es5|none|all>"）
  trailingComma: 'none',
  // 9.object对象里面的key和value值和括号间的空格(bracketSpacing: <bool>)
  bracketSpacing: true,
  // 10.标签多行属性写法时，尖括号是否另起一行(jsxBracketSameLine: <bool>)
  jsxBracketSameLine: true,
  bracketSameLine: true,
  // 11.箭头函数单个参数的情况是否省略括号，默认always是总是带括号（arrowParens: "<always|avoid>"）
  arrowParens: 'avoid',
  // 12.range是format执行的范围，可以选执行一个文件的一部分，默认的设置是整个文件（rangeStart: <int>  rangeEnd: <int>）
  rangeStart: 0,
  rangeEnd: Infinity,
  // 18. vue script和style标签中是否缩进,开启可能会破坏编辑器的代码折叠
  vueIndentScriptAndStyle: false,
  // 19. endOfLine: "<lf|crlf|cr|auto>" 行尾换行符,默认是lf,
  endOfLine: 'lf',
  // 20.embeddedLanguageFormatting: "off",默认是auto,控制被引号包裹的代码是否进行格式化
  embeddedLanguageFormatting: 'off',
  // 21.Enforce single attribute per line in HTML, Vue and JSX. 默认是false,不强制
  singleAttributePerLine: false
  // 22.html中的空格敏感性, 默认值只针对css
  // htmlWhitespaceSensitivity: 'css',
  // 23.markdown 文件是否折行，默认值 preserve 不处理
  // proseWrap: 'preserve',
  // 24.格式化完成后，是否在文件顶部插入 Pragma 指令（一种特殊注释），缺省值为false
  // insertPragma: false,
  // 25.是否只格式化那些文件顶部有 Pragma 指令（一种特殊注释）的文件，缺省值为false
  // requirePragma: false,
  // 26.格式化的解析器
  // Parser: 'None',
  // 27.指定文件的输入路径，这将被用于解析器参照
  // filepath: 'None'
}
