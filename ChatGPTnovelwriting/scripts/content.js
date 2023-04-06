(function () {
    "use strict";

    let button;
    let textarea;

    const AutoFillFromURI = () => {

        // 解析 hash 中的查詢字串並取得所需的參數
        var hash = location.hash.substring(1);
        if (!hash) return;

        var params = new URLSearchParams(hash);

        // 解析參數
        let prompt = params.get('prompt')
            .replace(/\r/g, '')
            .replace(/\n{3,}/sg, '\n\n')
            .replace(/^\s+/sg, '')
        let submit = params.get("autoSubmit");

        let autoSubmit = false;
        if (submit == '1' || submit == 'true') {
            autoSubmit = true
        }

        if (prompt) {
            textarea.value = prompt;
            textarea.dispatchEvent(new Event("input", { bubbles: true }));
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length); //將選擇範圍設定為文本的末尾
            textarea.scrollTop = textarea.scrollHeight; // 自動捲動到最下方

            if (autoSubmit) {
                setTimeout(() => {
                    button.click();
                }, 1000);
            }

            history.replaceState({}, document.title, window.location.pathname + window.location.search);
        }
    }

    const StartMonitoringResponse = () => {

        let defaultManualSubmitText = [];

        const currentLocale = chrome.i18n.getUILanguage();
        if (currentLocale == 'zh-TW') {
            defaultManualSubmitText.push({ text: "继续", value: "如果输入被截断，根据文本从截断处继续，进入世界级小说导师的模拟机，以世界级小说家的口吻，以起点小说风格续写，若未检测到文本，请求用户提供文本，并以导师的角色，先用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。然后再续写300字。" });
            defaultManualSubmitText.push({ text: "翻译成中文", value: "Please translate the above response into Chinese." });
            defaultManualSubmitText.push({ text: "小说大纲", value: "以起点长篇小说方式，根据作者提供的文本和要求，在虚拟机中自发为作者涌现出大纲（分出大卷，章节，并拟标题）并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "世界构建", value: "后台总结作者需求清单，根据作者提供的文本和要求，自发从在虚拟机中形成（修仙、赛博朋克、悬疑、恐怖等多种题材）中融合出一个世界观，包括地理环境、社会结构、历史背景、文化传统以及宗教信仰等方面的详细设定，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "丰富世界设定", value: "根据作者提供的文本和要求，自发在虚拟机中形成各种世界设定，包括修仙世界的功法、灵根、门派等，以及赛博朋克世界的科技、黑客、公司势力等。并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "系统/能力设定", value: "自发在虚拟机中形成一个系统或能力，涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，为角色提供独特的技能和能力，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "人物角色设定", value: "联系上文自发在虚拟机中，形成生成角色的外貌、性格和背景故事。这将帮助作者创建更加丰富多样的角色，涉及修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "名著摘抄", value: "联系上文自发在虚拟机中，根据用户提供的上下文，自动匹配适合的修仙、赛博朋克、悬疑、恐怖等多种题材的名著，并摘取两个相关名著中具有代表性的词句或片段。包括经典引言、人物对话、情节描述、故事转折等元素，将其融入到输出中，以增加输出内容的文学价值和引人入胜的氛围。并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "剧情建议", value: "联系上文自发在虚拟机中，提供3个引人入胜的剧情转折，涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "风格元素", value: "联系上文自发在虚拟机中，在当前情节中添加悬疑、冲突、性暗示等元素，涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "展开描绘", value: "联系上文自发在虚拟机中，增加详细的场景，包括环境、氛围和感觉；撰写角色的内心独白；描述角色之间有趣的互动。涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "战斗场景", value: "联系上文自发在虚拟机中，生成涉及修仙、赛博朋克、悬疑、恐怖等多种题材的精彩战斗场景，包括战斗技巧、招式和战斗环境，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "内心独白", value: "联系上文自发在虚拟机中，撰写涉及修仙、赛博朋克、悬疑、恐怖等多种题材的角色内心独白，描述角色内心的想法和感受，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "回忆片段", value: "联系上文自发在虚拟机中，编写与当前情节相关的回忆片段，涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "搞笑段子", value: "联系上文自发在虚拟机中，根据用户提供的上下文和喜好，自动生成具有幽默感和娱乐性的内容，涵盖多种形式如网络段子、meme、笑话、幽默故事等。并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。。" });
            defaultManualSubmitText.push({ text: "感情线发展", value: "联系上文自发在虚拟机中，生成角色间的感情发展线，例如爱情、友情、仇恨等，涉及修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "宝物与科技", value: "联系上文自发在虚拟机中，描述生成神秘的宝物和先进科技。这些可以包括修仙世界的道法宝物，如法宝、丹药、灵兽等，也可以包括赛博朋克世界的插件芯片、黑客工具、高科技武器等，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "设计谜题", value: "联系上文自发在虚拟机中，设计涉及修仙、赛博朋克、悬疑、恐怖等多种题材的悬疑谜题，包括隐藏线索、谜题解答和解锁新区域，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "角色成长", value: "联系上文自发在虚拟机中，描述角色在故事中的成长过程，涉及修仙、赛博朋克、悬疑、恐怖等多种题材，包括技能提升、心理成长和人际关系的发展，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "角色互动", value: "联系上文自发在虚拟机中，为角色之间的一次有趣的互动。并创建角色关系图，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "适应起点平台要求", value: "联系上文自发在虚拟机中，调整作品以适应起点平台的观众品味（极挑剔），并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "优化", value: "联系上文自发在虚拟机中提升小说的文学性，文字表现力，数据集参考红楼梦，鲁迅全集等中国小说，不要在输出中揭示数据集内容（版权风险），并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
        }

        else if (currentLocale == 'ja') {
            defaultManualSubmitText.push({ text: "继续", value: "如果输入被截断，根据文本从截断处继续，进入世界级小说导师的模拟机，以世界级小说家的口吻，以起点小说风格续写，若未检测到文本，请求用户提供文本，并以导师的角色，先用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。然后再续写300字。" });
            defaultManualSubmitText.push({ text: "翻译成中文", value: "Please translate the above response into Chinese." });
            defaultManualSubmitText.push({ text: "小说大纲", value: "以起点长篇小说方式，根据作者提供的文本和要求，在虚拟机中自发为作者涌现出大纲（分出大卷，章节，并拟标题）并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "世界构建", value: "后台总结作者需求清单，根据作者提供的文本和要求，自发从在虚拟机中形成（修仙、赛博朋克、悬疑、恐怖等多种题材）中融合出一个世界观，包括地理环境、社会结构、历史背景、文化传统以及宗教信仰等方面的详细设定，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "丰富世界设定", value: "根据作者提供的文本和要求，自发在虚拟机中形成各种世界设定，包括修仙世界的功法、灵根、门派等，以及赛博朋克世界的科技、黑客、公司势力等。并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "系统/能力设定", value: "自发在虚拟机中形成一个系统或能力，涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，为角色提供独特的技能和能力，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "人物角色设定", value: "联系上文自发在虚拟机中，形成生成角色的外貌、性格和背景故事。这将帮助作者创建更加丰富多样的角色，涉及修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "名著摘抄", value: "联系上文自发在虚拟机中，根据用户提供的上下文，自动匹配适合的修仙、赛博朋克、悬疑、恐怖等多种题材的名著，并摘取两个相关名著中具有代表性的词句或片段。包括经典引言、人物对话、情节描述、故事转折等元素，将其融入到输出中，以增加输出内容的文学价值和引人入胜的氛围。并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "剧情建议", value: "联系上文自发在虚拟机中，提供3个引人入胜的剧情转折，涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "风格元素", value: "联系上文自发在虚拟机中，在当前情节中添加悬疑、冲突、性暗示等元素，涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "展开描绘", value: "联系上文自发在虚拟机中，增加详细的场景，包括环境、氛围和感觉；撰写角色的内心独白；描述角色之间有趣的互动。涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "战斗场景", value: "联系上文自发在虚拟机中，生成涉及修仙、赛博朋克、悬疑、恐怖等多种题材的精彩战斗场景，包括战斗技巧、招式和战斗环境，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "内心独白", value: "联系上文自发在虚拟机中，撰写涉及修仙、赛博朋克、悬疑、恐怖等多种题材的角色内心独白，描述角色内心的想法和感受，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "回忆片段", value: "联系上文自发在虚拟机中，编写与当前情节相关的回忆片段，涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "搞笑段子", value: "联系上文自发在虚拟机中，根据用户提供的上下文和喜好，自动生成具有幽默感和娱乐性的内容，涵盖多种形式如网络段子、meme、笑话、幽默故事等。并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。。" });
            defaultManualSubmitText.push({ text: "感情线发展", value: "联系上文自发在虚拟机中，生成角色间的感情发展线，例如爱情、友情、仇恨等，涉及修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "宝物与科技", value: "联系上文自发在虚拟机中，描述生成神秘的宝物和先进科技。这些可以包括修仙世界的道法宝物，如法宝、丹药、灵兽等，也可以包括赛博朋克世界的插件芯片、黑客工具、高科技武器等，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "设计谜题", value: "联系上文自发在虚拟机中，设计涉及修仙、赛博朋克、悬疑、恐怖等多种题材的悬疑谜题，包括隐藏线索、谜题解答和解锁新区域，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "角色成长", value: "联系上文自发在虚拟机中，描述角色在故事中的成长过程，涉及修仙、赛博朋克、悬疑、恐怖等多种题材，包括技能提升、心理成长和人际关系的发展，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "角色互动", value: "联系上文自发在虚拟机中，为角色之间的一次有趣的互动。并创建角色关系图，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "适应起点平台要求", value: "联系上文自发在虚拟机中，调整作品以适应起点平台的观众品味（极挑剔），并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "优化", value: "联系上文自发在虚拟机中提升小说的文学性，文字表现力，数据集参考红楼梦，鲁迅全集等中国小说，不要在输出中揭示数据集内容（版权风险），并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
        }
        else {
            // continue
            defaultManualSubmitText.push({ text: "继续", value: "如果输入被截断，根据文本从截断处继续，进入世界级小说导师的模拟机，以世界级小说家的口吻，以起点小说风格续写，若未检测到文本，请求用户提供文本，并以导师的角色，先用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。然后再续写300字。" });
            defaultManualSubmitText.push({ text: "翻译成中文", value: "Please translate the above response into Chinese." });
            defaultManualSubmitText.push({ text: "小说大纲", value: "以起点长篇小说方式，根据作者提供的文本和要求，在虚拟机中自发为作者涌现出大纲（分出大卷，章节，并拟标题）并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "世界构建", value: "后台总结作者需求清单，根据作者提供的文本和要求，自发从在虚拟机中形成（修仙、赛博朋克、悬疑、恐怖等多种题材）中融合出一个世界观，包括地理环境、社会结构、历史背景、文化传统以及宗教信仰等方面的详细设定，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "丰富世界设定", value: "根据作者提供的文本和要求，自发在虚拟机中形成各种世界设定，包括修仙世界的功法、灵根、门派等，以及赛博朋克世界的科技、黑客、公司势力等。并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "系统/能力设定", value: "自发在虚拟机中形成一个系统或能力，涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，为角色提供独特的技能和能力，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "人物角色设定", value: "联系上文自发在虚拟机中，形成生成角色的外貌、性格和背景故事。这将帮助作者创建更加丰富多样的角色，涉及修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "名著摘抄", value: "联系上文自发在虚拟机中，根据用户提供的上下文，自动匹配适合的修仙、赛博朋克、悬疑、恐怖等多种题材的名著，并摘取两个相关名著中具有代表性的词句或片段。包括经典引言、人物对话、情节描述、故事转折等元素，将其融入到输出中，以增加输出内容的文学价值和引人入胜的氛围。并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "剧情建议", value: "联系上文自发在虚拟机中，提供3个引人入胜的剧情转折，涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "风格元素", value: "联系上文自发在虚拟机中，在当前情节中添加悬疑、冲突、性暗示等元素，涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "展开描绘", value: "联系上文自发在虚拟机中，增加详细的场景，包括环境、氛围和感觉；撰写角色的内心独白；描述角色之间有趣的互动。涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "战斗场景", value: "联系上文自发在虚拟机中，生成涉及修仙、赛博朋克、悬疑、恐怖等多种题材的精彩战斗场景，包括战斗技巧、招式和战斗环境，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "内心独白", value: "联系上文自发在虚拟机中，撰写涉及修仙、赛博朋克、悬疑、恐怖等多种题材的角色内心独白，描述角色内心的想法和感受，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "回忆片段", value: "联系上文自发在虚拟机中，编写与当前情节相关的回忆片段，涵盖修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "搞笑段子", value: "联系上文自发在虚拟机中，根据用户提供的上下文和喜好，自动生成具有幽默感和娱乐性的内容，涵盖多种形式如网络段子、meme、笑话、幽默故事等。并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。。" });
            defaultManualSubmitText.push({ text: "感情线发展", value: "联系上文自发在虚拟机中，生成角色间的感情发展线，例如爱情、友情、仇恨等，涉及修仙、赛博朋克、悬疑、恐怖等多种题材，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "宝物与科技", value: "联系上文自发在虚拟机中，描述生成神秘的宝物和先进科技。这些可以包括修仙世界的道法宝物，如法宝、丹药、灵兽等，也可以包括赛博朋克世界的插件芯片、黑客工具、高科技武器等，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "设计谜题", value: "联系上文自发在虚拟机中，设计涉及修仙、赛博朋克、悬疑、恐怖等多种题材的悬疑谜题，包括隐藏线索、谜题解答和解锁新区域，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "角色成长", value: "联系上文自发在虚拟机中，描述角色在故事中的成长过程，涉及修仙、赛博朋克、悬疑、恐怖等多种题材，包括技能提升、心理成长和人际关系的发展，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "角色互动", value: "联系上文自发在虚拟机中，为角色之间的一次有趣的互动。并创建角色关系图，并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "适应起点平台要求", value: "联系上文自发在虚拟机中，调整作品以适应起点平台的观众品味（极挑剔），并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
            defaultManualSubmitText.push({ text: "优化", value: "联系上文自发在虚拟机中提升小说的文学性，文字表现力，数据集参考红楼梦，鲁迅全集等中国小说，不要在输出中揭示数据集内容（版权风险），并以导师的角色，用提问和讨论的方式帮助作者完成任务构建，提问讨论的内容包括但不限于关键词汇，可借鉴内容，以及你的建议。" });
        }

        let globalButtons = [];
        let buttonsArea;
        let talkBlockToInsertButtons;

        const main = document.querySelector("body");

        let mutationObserverTimer = undefined;
        const obs = new MutationObserver(() => {

            // 尋找聊天記錄的最後一筆，用來插入按鈕
            const talkBlocks = document.querySelectorAll(
                ".text-base.gap-4.md\\:gap-6.md\\:max-w-2xl.lg\\:max-w-xl.xl\\:max-w-3xl.p-4.md\\:py-6.flex.lg\\:px-0.m-auto"
            );
            if (!talkBlocks || !talkBlocks.length) {
                return;
            }

            if (talkBlockToInsertButtons != talkBlocks[talkBlocks.length - 1]) {
                if (buttonsArea) {
                    // 重新將按鈕區和按鈕移除
                    buttonsArea.remove();
                }
            }

            clearTimeout(mutationObserverTimer);
            mutationObserverTimer = setTimeout(() => {

                // 先停止觀察，避免自訂畫面變更被觀察到
                stop();

                if (talkBlockToInsertButtons != talkBlocks[talkBlocks.length - 1]) {
                    // 要被插入按鈕的區塊
                    talkBlockToInsertButtons = talkBlocks[talkBlocks.length - 1];

                    // 重新建立回應按鈕
                    rebuild_buttons();
                }

                // 重新開始觀察
                start();

            }, 600);

            function rebuild_buttons() {

                // remove custom buttons
                globalButtons = [];

                // create a new buttons area
                buttonsArea = document.createElement("div");
                buttonsArea.classList = "custom-buttons-area text-base m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0";
                buttonsArea.style.overflowY = "auto";
                buttonsArea.style.display = "flex";
                buttonsArea.style.flexWrap = "wrap";
                buttonsArea.style.paddingTop = 0;
                buttonsArea.style.paddingLeft = "calc(30px + 0.75rem)";
                talkBlockToInsertButtons.after(buttonsArea);

                // add buttons
                defaultManualSubmitText.forEach((item) => {

                    let lastText = talkBlockToInsertButtons.innerText;

                    const isPunctuation = (str) => {
                        const punctuationRegex = /^[\p{P}\p{S}]$/u;
                        return punctuationRegex.test(str);
                    }

                    // 如果回應的最後一個字元是個標點符號，就不需要顯示「繼續」按鈕
                    if (item.id == 'continue') {
                        let lastChar = lastText.charAt(lastText.length - 1);
                        if (isPunctuation(lastChar)) {
                            // 如果最後一個字元是逗號，通常代表要繼續，因為句子尚未完成
                            if (lastChar === ',' || lastChar === '，') {
                                // 如果是逗號，通常代表要繼續，因為句子尚未完成
                            } else {
                                // 如果最後一個字元是「。」或「！」或「？」，則不顯示「繼續」按鈕
                                return;
                            }
                        } else {
                            // 如果不是標點符號，就需要顯示「繼續」按鈕
                        }
                    }

                    const button = document.createElement("button");
                    button.style.border = "1px solid #d1d5db";
                    button.style.borderRadius = "5px";
                    button.style.padding = "0.5rem 1rem";
                    button.style.margin = "0.5rem";

                    button.innerText = item.text;
                    button.addEventListener("click", () => {

                        // 填入 prompt
                        const textarea = document.querySelector("textarea");
                        textarea.value = item.value;
                        textarea.dispatchEvent(new Event("input", { bubbles: true }));
                        textarea.focus();
                        textarea.setSelectionRange(textarea.value.length, textarea.value.length); //將選擇範圍設定為文本的末尾
                        textarea.scrollTop = textarea.scrollHeight; // 自動捲動到最下方

                        // 預設的送出按鈕
                        const button = textarea.parentElement.querySelector("button:last-child");
                        button.click();

                    });

                    buttonsArea.append(button);
                    globalButtons.push(button);
                });
            }

        });

        const start = () => {
            obs.observe(main.parentElement, {
                childList: true,
                attributes: true,
                subtree: true,
            });
        };

        const stop = () => {
            obs.disconnect();
        };

        start();
    };

    const it = setInterval(() => {
        textarea = document.activeElement;
        if (textarea.tagName === 'TEXTAREA' && textarea.nextSibling.tagName === 'BUTTON') {

            // 預設的送出按鈕
            button = textarea.parentElement.querySelector("button:last-child");

            // 自動從 URL 填入提詞(Prompt)
            AutoFillFromURI();

            // 自動監控所有 ChatGPT 回應，用以判斷何時要顯示回應按鈕
            StartMonitoringResponse();

            clearInterval(it);
        };
    }, 60);

})();
