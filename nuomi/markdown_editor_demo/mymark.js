/**
 * 可以解析标题; 可以解析列表，包含有序和无序列表; 可以解析引用和代码块
 * REF:marked.js->https://github.com/markedjs/marked/blob/master/lib/marked.js
 */

(function (root) {
    /* 
    * ===============  定义正则，利用edit函数书写更清晰 ==================
    */
    let block = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        codev2: /^ *(`{3})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
        hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/, //todo
        heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
        blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
        bullet: /(?:-|\d+\.)/,
        list: /^( *)(bull) [\s\S]+?(?:\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        listitem: /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,
        text: /^[^\n]+/
    };

    block.listitem = edit(block.listitem, 'gm')
        .replace(/bull/g, block.bullet)
        .getRegex();

    block.list = edit(block.list)
        .replace(/bull/g, block.bullet)
        .getRegex();

    function edit(regex, opt) {
        regex = regex.source || regex;
        opt = opt || '';
        return {
            replace: function (name, val) {
                val = val.source || val;
                val = val.replace(/(^|[^\[])\^/g, '$1');
                regex = regex.replace(name, val);
                return this;
            },
            getRegex: function () {
                return new RegExp(regex, opt);
            }
        };
    }
    // edit函数还有另一种写法：
    //   function replace(regex, opt) {
    //     regex = regex.source
    //     opt = opt || ''
    //     return function self(name, val) {
    //         if (!name) return new RegExp(regex, opt)
    //         val = val.source || val
    //         val = val.replace(/(^|[^\[])\^/g, '$1')
    //         regex = regex.replace(name, val)
    //         return self
    //     }
    // }

    /* 
    * ===============  开始解析 正文 (解析函数中包含渲染) ==================
    */
    function parse(content) {
        let result = '';
        let cap;
        while (content) {

            // 如果匹配到换行
            if (cap = block.newline.exec(content)) {
                content = content.slice(cap[0].length);
                //render nothing
            }
            // 匹配代码块
            if (cap = block.code.exec(content)) {
                result += `<pre><code>${cap[0].slice(4)}</code></pre>`
                content = content.slice(cap[0].length)
                continue
            }
            // 匹配第二种代码块
            if (cap = block.codev2.exec(content)) {
                let res = cap[0]
                let lang = cap[2]
                let value = cap[3]
                result += `<pre><code>${value}</code></pre>`
                content = content.slice(res.length)
                continue
            }
            // 如果匹配到标题
            if (cap = block.heading.exec(content)) {
                let res = cap[0]
                let tag = cap[1]
                let value = cap[2]
                result += `<h${tag.length}>${value}</h${tag.length}>`
                content = content.slice(res.length)
                continue
            }
            // 匹配列表正则
            if (cap = block.list.exec(content)) {
                let res = cap[0]
                result += cap[2] === '-' ? '<ul>' : '<ol>' // 用bull.length > 1来判断更好（例如1.xx)
                // 在内部再进行遍历，拼装 li 标签
                let _result = res.match(block.listitem)
                let len = _result.length
                for (let i = 0; i < len; i++) {
                    _result[i] = _result[i].replace(/^ *([-]|\d+\.) +/, '');
                    result += `<li>${_result[i]}</li>`
                }
                result += cap[2] === '-' ? '</ul>' : '</ol>'
                content = content.slice(res.length)
                continue
            }
            // 匹配引用
            if (cap = block.blockquote.exec(content)) {
                let res = cap[0]
                let _res = res.replace(/^ *> ?/gm, '');
                result += `<blockquote>${_res}</blockquote>`
                content = content.slice(res.length)
                continue
            }

            // 匹配正文内容
            if (cap = block.text.exec(content)) {
                result += `<p>${(cap[0])}</p>`
                content = content.slice(cap[0].length)
                continue
            }
            content = null
        }
        return result
    }


    function mymark(content) {
        content = content
            .replace(/\r\n|\r/g, '\n')
            .replace(/\t/g, '    ')
            .replace(/\u00a0/g, ' ')
            .replace(/\u2424/g, '\n');
        return parse(content);
    }

    root.mymark = mymark;
})(this || (typeof window !== 'undefined' ? window : global))

