window.addEventListener("DOMContentLoaded", function () {
    var canvas = document.createElement("canvas");
    canvas.id = "live2d";
    canvas.className = "live2d";
    canvas.width = 300;
    canvas.height = 400;
    canvas.style.position = "fixed";
    canvas.style.bottom = "-60px";
    canvas.style.left = "0";
    canvas.style.zIndex = "9999";
    canvas.style.pointerEvents = "auto";
    document.body.appendChild(canvas);

    var script = document.createElement("script");
    script.src = "/js/live2d.js";
    script.onload = function () {
        loadlive2d("live2d", "/Pio/model.json");

        function showBubble(text, duration = 5000) {
            var existing = document.getElementById("live2d-bubble");
            if (existing) existing.remove();

            var bubble = document.createElement("div");
            bubble.id = "live2d-bubble";
            bubble.style.position = "fixed";
            bubble.style.bottom = "210px";
            bubble.style.left = "10px";
            bubble.style.maxWidth = "220px";
            bubble.style.padding = "8px 12px";
            bubble.style.backgroundColor = "transparent";
            bubble.style.color = "pink";
            bubble.style.borderRadius = "10px";
            bubble.style.fontSize = "14px";
            bubble.style.fontFamily = "Arial, sans-serif";
            bubble.style.zIndex = "10000";
            bubble.style.pointerEvents = "auto";
            bubble.style.opacity = "0";
            bubble.style.textShadow = "0 0 4px rgba(255,192,203,0.8)";
            bubble.style.transition = "opacity 0.5s ease";
            bubble.innerText = text;

            document.body.appendChild(bubble);

            setTimeout(() => {
                bubble.style.opacity = "1";
            }, 100);

            setTimeout(() => {
                bubble.style.opacity = "0";
                setTimeout(() => {
                    bubble.remove();
                }, 500);
            }, duration);
        }

        setTimeout(() => {
            showBubble("欢迎来到我的网站！有什么需要帮忙的吗？");
        }, 500);

        setTimeout(() => {
            showBubble("你已经在这里待了好久了，要不要站起来喝口水？", 7000);
        }, 600000);

        // 点击计数与随机文案
        let clickCount = 0;
        // 随机台词列表
        const randomReplies = [
            "哎呀，不要戳我啦！",
            "哼，别烦我！",
            "再戳我可要生气了！",
            "你真有耐心啊~",
            "停下啦，疼呢！",
            "我在这里，不用一直戳啦！",
            "嘿，你喜欢我吗？",
            "别戳我啦，我会害羞的！"
        ];
        // 随机在3~10次之间触发一句话
        let triggerThreshold = Math.floor(Math.random() * 8) + 3; // 3~10

        canvas.addEventListener("click", function () {
            clickCount++;
            if (clickCount >= triggerThreshold) {
                // 随机选一句回复
                const idx = Math.floor(Math.random() * randomReplies.length);
                showBubble(randomReplies[idx]);
                // 重置计数和触发阈值
                clickCount = 0;
                triggerThreshold = Math.floor(Math.random() * 8) + 3;
            }
            // 点击没达到阈值，不显示气泡
        });
    };
    document.body.appendChild(script);
});
