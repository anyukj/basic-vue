// 参考配置：https://segmentfault.com/a/1190000012909159
module.exports = {
  // 超过最大值换行
  printWidth: 120,
  // 使用分号, 默认true
  semi: true,
  // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
  singleQuote: true,
  // 在任何可能的多行中输入尾逗号
  trailingComma: 'all',
  // Script和Style使用Vue的缩进
  vueIndentScriptAndStyle: true,
  /* 行结束
   "auto" - 维护现有的行结尾（通过查看第一行之后使用的内容来标准化一个文件中的混合值）
   "lf"- Line Feed only（\n），在 Linux 和 macOS 以及 git repos 内部很常见
   "crlf"- 回车符+换行符（\r\n），在 Windows 上很常见
   "cr"- 仅限回车符（\r），很少使用*/
  endOfLine: 'crlf',
};
