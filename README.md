# 🏋️‍♂️ Gym Equipment Graphic & Metadata Library
### 健身房商用器械标准化图库与结构化元数据规范

<p align="center">
  <img src="https://img.shields.io/badge/Total_Equipment-77_Standard-blue?style=for-the-badge&logo=target" alt="Total Equipment" />
  <img src="https://img.shields.io/badge/Primary_Format-WebP_(1200px)-green?style=for-the-badge&logo=image" alt="WebP Format" />
  <img src="https://img.shields.io/badge/Background-100%25_Transparent-orange?style=for-the-badge" alt="Transparent" />
  <img src="https://img.shields.io/badge/WeChat_MiniProgram-Ready-07C160?style=for-the-badge&logo=wechat" alt="MiniProgram Ready" />
  <img src="https://img.shields.io/badge/License-CC_BY--NC_4.0_&_MIT-purple?style=for-the-badge" alt="License" />
</p>

---

# 🇨🇳 简体中文说明文档

## 📌 项目概述

**Gym Equipment Graphic & Metadata Library** 是一套专为健身行业开发者、UI/UX 设计师、运动科学研究者以及**微信小程序 / App 独立开发者**打造的**商用健身器械标准化图形与结构化元数据集**。

本仓库采用**全量原生 WebP 架构**，彻底剥离冗余的未压缩原始 PNG 与商业原厂参考图（避免版权合规风险），全库经过专业去品牌标识（De-branding）、100% 透明背景净空（RGBA）与 8% 呼吸安全留白，仓库总体积仅约 **15 MB**，支持秒级克隆与零服务依赖本地即开即看。

---

## 🌟 核心特性与设计规范

### 1. 全量 WebP 极速分发（兼顾极致清晰度与超小体积）
- **100% 透明通道（RGBA）**：四角及边缘 Alpha 均为 0，无任何毛边、杂质底色或白边残留，无缝贴合浅色、深色（Dark Mode）或渐变背景。
- **8% 安全呼吸留白**：在 1200×1200 像素画布中，器械主体等比例居中，四周严格保留 `>= 8%`（≥ 96px）呼吸边距，在圆角卡片、头像框及轮播图中展示绝不切边贴边。
- **超高压缩比**：相比原始 PNG 缩减 **83.5%** 体积，整套 77 款 1200px 极清图总大小仅约 **12 MB**。


> 全套 77 款缩略图总大小仅 **1.1 MB**，小程序可一次性打包预加载，首屏秒级直出！

### 3. 完整的结构化元数据 (JSON)
在 [`data/equipment_master.json`](data/equipment_master.json) 中提供：
- 中英文标准命名（统一剥除注册商标注记，规范动作名称）；
- 国际通行器械分类与阻力系列（挂片式、配重式、史密斯机、心肺体能机等）；
- 针对主要肌肉群与训练部位分类；
- 国内商业健身房普及度分级（`常见` / `一般` / `少见`）。

### 4. 零依赖离线预览画廊
文件管理器中**双击 `index.html`** 即可在任意现代浏览器中运行，直连本地 `images/webp/` 目录：
- 🔍 **智能搜索**：输入“推胸”、“背阔肌”、“深蹲”或编号秒级响应；
- 🏷️ **多维筛选**：器械类型、训练部位、国内健身房普及度交叉过滤；
- 🖼️ **高清大图弹窗**：支持适应窗口、1:1 原始尺寸及 2 倍放大查看。

---

## ⚖️ 开源协议与知识产权免责声明

本项目采用双重开源授权模型：
1. **美术图像与结构化元数据**：采用 **[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)（知识共享 署名-非商业性使用 4.0 国际许可协议）**。允许个人学习、科研教学、非营利项目免费共享与改动；未经许可不得用于商业转售素材包。
2. **所有代码与构建脚本**：采用 **[MIT License](LICENSE)**，允许任意自由集成与修改。

> [!NOTE]
> 本仓库中所有图片均为去商标化（De-branded）、重新校色与矢量/位图重构的高保真示意图。未经去标的原始参考图已被严格排除在仓库外。

---
