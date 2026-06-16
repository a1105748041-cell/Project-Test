// 修复美国院校截止日期数据文件中的语法错误
const fs = require('fs');
const path = require('path');

// 读取文件内容
const filePath = path.join(__dirname, 'university_deadlines.js');
let content = fs.readFileSync(filePath, 'utf8');

// 修复语法错误：移除学校名称中的换行符和无效字符
// 使用正则表达式匹配并修复学校名称
// 匹配模式："[\s\S]*?": {
// 这将匹配所有学校名称行
content = content.replace(/"[\s\S]*?": {/g, match => {
  // 移除换行符和多余的空格
  let fixed = match.replace(/\n/g, '').replace(/\s+/g, ' ');
  // 移除开头和结尾的多余空格
  fixed = fixed.replace(/"\s+/, '"').replace(/\s+"/, '"');
  // 确保名称中只有有效的学校名称，移除其他字符
  // 保留字母、数字、空格、连字符和&符号
  fixed = fixed.replace(/"([^"\n]*)"/, (_, name) => {
    // 清理学校名称，只保留字母、数字、空格、连字符、&符号和大学/学院等关键词
    let cleanName = name.replace(/[^a-zA-Z0-9\s&\-]+/g, '').trim();
    // 移除无效的前缀（如Y、Y Y等）
    cleanName = cleanName.replace(/^(Y|ACT Tests|Used INTL|Forms)\s*/i, '').trim();
    return `"${cleanName}"`;
  });
  return fixed;
});

// 写入修复后的内容
fs.writeFileSync(filePath, content);

console.log('文件修复完成！');
