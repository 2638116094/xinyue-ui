import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "这是title",
  description: "description",
  appearance:"dark",
  lang:"zh-CN",
  cleanUrls: true,// 开启纯净链接
  markdown: {
    image: {
      lazyLoading: true
    }
  },
  themeConfig: {
    sidebarMenuLabel:'目录',
    returnToTopLabel: '返回顶部',
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    carbonAds: {
      carbonAds: {
        code: 'carbon-code',
        placement: 'carbon-placement'
      }
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档···'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        collapsed: true,
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: '111Runtime ', link: '/api-examples' },
          { text: '快速入门', link: '/guid' }
        ]
      },
      {
        text: '分组2',
        collapsed: true,
        items: [
          { text: '子集', link: '/guid' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'gitee', link: 'https://gitee.com/zzcjmxj_admin' }
    ],
    footer: {
      message: 'Released under the MIT license.',
      copyright: `Copyright © 2019-${new Date().getFullYear()} present Evan You`
    },
    editLink: { 
      pattern: 'https://github.com/2638116094/xinyue-ui/tree/main/docs/:path', // 改成自己的仓库
      text: '在GitHub编辑本页'
    },
  }
})
