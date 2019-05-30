const path = require('path');
module.exports = {
    isLazyLoad: false,
    favicon: path.resolve(__dirname, 'favicon.ico'),
    htmlChunk: {
        '$all': {
            title: "111",
            //       headChunk: [`<meta name="renderer" content="webkit|ie-comp|ie-stand"/>`,
            //         `<meta http-equiv= "X-UA-Compatible" content = "IE=edge,chrome=1"/>`,
            //         `<meta name="renderer" content="webkit">`,
            //         `<meta name="keywords" content= "星际争霸II战队联赛、星际战队联赛、星际争霸、StarCraft Team Champions、SCboy、星际老男孩、黄旭东、毒奶色、孙一峰/">`,
            //         `<meta name="description" content="2019中国星际争霸2战队联赛（Team Championship）是由SCboy发起网易暴雪授权的联赛，2019赛季共有8支来自世界各地的队伍参加。"/>`,
            //         `<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />`,
            //         `<meta name="format-detection" content="telephone=no" />`,
            //         `<script type="text/javascript">
            //   var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
            //   document.write(unescape("%3Cspan id='cnzz_stat_icon_1260334767' style='display:none' %3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1260334767' type='text/javascript'%3E%3C/script%3E"));
            // </script>`,
            // ],
        }
    },
    server: {
        alias: {
            "@": path.resolve(__dirname, 'src'),
            "env": path.resolve(__dirname, 'env/beta.js')
        },
    },
    build: {
        beta: {
            alias: {
                "@": path.resolve(__dirname, 'src'),
                env: path.resolve(__dirname, 'env/beta.js')
            },
        },
        image: {
            alias: {
                "@": path.resolve(__dirname, 'src'),
                env: path.resolve(__dirname, 'env/image.js')
            }
        },
        prod: {
            alias: {
                "@": path.resolve(__dirname, 'src'),
                env: path.resolve(__dirname, 'env/prod.js')
            }
        }
    }
};