// 出口分析器：按出口反推选专业（Tab 切换）
(function () {
  var DATA = {
    gk: {
      majors: ['法学', '汉语言文学', '会计学', '财政学·税务', '经济学', '计算机', '电子信息（大类）', '统计学'],
      schools: '普通考公不看院校，专业对口比学校更重要；院校优势只在定向选调/人才引进/部分央企校招中体现；本科即可报考，硕士选岗面更宽',
      xuanke: '法学、汉语言、会计多不限选科；计算机、电子信息、统计类需物理',
      time: '国考10月中旬报名、11月底/12月初笔试；多数省份1—2月报名、3月中下旬联考；定向选调公告9—12月；事业编上半年约3月底、下半年约10月底',
      kaoshi: '公务员考行测（常识/言语/数量/判断/资料五模块）+申论（公安/证监等加专业科目）；事业编考职测+综合应用能力，按ABCDE五类分卷',
      shenzao: '法检等岗位多要求法考A证；在职晋升可读公共管理硕士（MPA）',
      jingzheng: '对口岗约30–60:1（估算）；「三不限」岗位可达数百比一；应届身份可报岗位更多'
    },
    gq: {
      majors: ['电气工程', '石油工程', '轨道交通信号与控制', '核工程', '土木工程', '财会类'],
      schools: '华北电力/东北电力（电网）、石油类院校、西南交大、石家庄铁道',
      xuanke: '工科专业几乎全部要求物理+化学，历史类基本无缘',
      time: '国网一批11月网申、12月中旬笔试（名额主力），二批次年3月网申、4月笔试；南网独立招聘，一批通常10—11月网申；银行秋招9—11月',
      kaoshi: '电网电工类=专业课约80%（电路/电机/电力系统/继电保护）+综合能力约20%；网申先筛院校、专业目录与四六级证书',
      shenzao: '校招看重第一学历与硕士学历；专科可入基层技术岗',
      jingzheng: '行业周期明显：土建收缩，电网、核电、新能源扩招'
    },
    gxs: {
      majors: ['不限专业：快消/零售运营管培', '银行管培生', '央企总部管培', '酒店集团管培', '互联网产品/运营管培'],
      schools: '不卡专业卡院校档与面试表达：头部快消外企、国有大行总行、央企总部是传统正规军',
      xuanke: '文理不限，任何选科组合都可走；英语能力是隐性门槛',
      time: '大四秋招为主战场（8–11月），快消群面集中在9–10月；大三暑期实习转正是捷径',
      kaoshi: '网申→测评（行测+性格）→群面（无领导小组）→单面多轮；筛学生会头衔、组织实绩与表达领导力',
      shenzao: '轮岗2–3年后定岗；后续晋升可读MBA进阶',
      jingzheng: '头部项目千里挑一（估算）；「学生会主席+大厂实习+英语好」是标准画像；警惕小公司伪管培（无轮岗纯打杂）'
    },
    dc: {
      majors: ['计算机', '软件工程', '人工智能', '电子信息', '微电子', '金融工程'],
      schools: '两电一邮、顶尖985计算机学院；杭电、深大区域认可度高',
      xuanke: '物理+化学是硬门槛，历史类考生基本无法报考',
      time: '大三暑期实习是大四秋招入场券；秋招8–10月提前批+正式批',
      kaoshi: '技术岗：笔试算法题+2–4轮技术面+HR面；产品运营岗常见群面',
      shenzao: '算法岗硕士起步；开发岗靠大三前攒2–3段实习',
      jingzheng: '薪资天花板最高；强学历筛选与「35岁」焦虑并存'
    },
    yx: {
      majors: ['临床医学', '口腔医学', '麻醉学', '医学影像', '替代：药学/护理'],
      schools: '北协和、南湘雅、东齐鲁、西华西；省属医科大在本省三甲认可度高',
      xuanke: '物理+化学几乎全部必选，部分院校加生物',
      time: '5+3一体化=5年本科+3年临床医学硕士（规培并轨），共8年；再读博3—4年，全程11—12年',
      kaoshi: '执业医师资格考试+规培结业考核；入职三甲再看学历与科研成果',
      shenzao: '优先5+3一体化；三甲入门多为博士+规培，部分岗位硕士可进',
      jingzheng: '培养周期11—12年（仅5+3为8年）；收入曲线后置、越老越吃香'
    },
    js: {
      majors: ['汉语言（师范）', '数学（师范）', '英语（师范）', '物理（师范）', '学前教育'],
      schools: '六所部属师范大学公费师范（2024年起本研衔接4+2，履约6年、定向地市及以下）；双一流学科师范校',
      xuanke: '大多不限选科；想教数理化建议选物理',
      time: '事业编D类联考上半年约3月底、下半年约10月底；各地校招/社招窗口集中在暑假前后',
      kaoshi: '教师资格证笔试面试+教师编《教综》+学科知识；部分城市加试试讲',
      shenzao: '一线城市重点中学招聘已卷至硕士乃至清北',
      jingzheng: '出生率下行、长期岗位收缩；公费师范有编有岗但需履约6年、定向地市及以下'
    },
    xs: {
      majors: ['数学', '物理学', '化学', '生物科学', '哲学·历史（人文方向）'],
      schools: '强基计划39所双一流；中科大、南开等基础学科强校',
      xuanke: '理科基础学科需物化；人文方向不限选科',
      time: '保研夏令营大三暑假5—7月报名，9月预推免+正式推免；强基需转段考核',
      kaoshi: '保研=三年绩点+夏令营/预推免考核；考研12月统考（政治/英语/数学/专业课）',
      shenzao: '本硕博/直博是标配；强基为衔接培养，转段需考核、有分流；综评/专项入学注意转专业限制',
      jingzheng: '「生化环材」需读到博士才解套；高校教职「非升即走」'
    }
  };

  var ROWS = [
    ['schools', '优势院校'],
    ['xuanke', '选科要求'],
    ['time', '时间窗口'],
    ['kaoshi', '笔试/考核'],
    ['shenzao', '深造建议'],
    ['jingzheng', '竞争现实']
  ];

  var explorer = document.getElementById('explorer');
  if (!explorer) return;

  var panel = explorer.querySelector('[data-panel]');
  var tabs = Array.prototype.slice.call(explorer.querySelectorAll('.tab'));

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function render(key) {
    var d = DATA[key];
    if (!d || !panel) return;
    var html = '<p class="cap">对口专业</p><div class="tags">';
    d.majors.forEach(function (m) {
      html += '<span class="tag">' + escapeHtml(m) + '</span>';
    });
    html += '</div><div class="info-rows">';
    ROWS.forEach(function (r) {
      html += '<div class="info-row"><span class="info-label">' + r[1] + '</span><span class="info-value">' + escapeHtml(d[r[0]]) + '</span></div>';
    });
    html += '</div>';
    panel.innerHTML = html;
  }

  function activate(btn, focus) {
    var key = btn.dataset.key;
    if (!DATA[key]) return;
    tabs.forEach(function (t) {
      var on = t === btn;
      t.dataset.active = on ? 'true' : 'false';
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.setAttribute('tabindex', on ? '0' : '-1');
    });
    if (panel) panel.setAttribute('aria-labelledby', btn.id);
    render(key);
    if (focus) btn.focus();
  }

  explorer.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.tab') : null;
    if (!btn || !explorer.contains(btn)) return;
    activate(btn, false);
  });

  explorer.addEventListener('keydown', function (e) {
    var btn = e.target.closest ? e.target.closest('.tab') : null;
    if (!btn) return;
    var i = tabs.indexOf(btn);
    if (i < 0) return;
    var next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = tabs[(i + 1) % tabs.length];
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = tabs[(i - 1 + tabs.length) % tabs.length];
    else if (e.key === 'Home') next = tabs[0];
    else if (e.key === 'End') next = tabs[tabs.length - 1];
    if (next) {
      e.preventDefault();
      activate(next, true);
    }
  });

  // 初始面板与 DATA 保持一致，避免首次点击已激活标签时内容跳变
  if (tabs.length && panel) activate(tabs[0], false);
})();
