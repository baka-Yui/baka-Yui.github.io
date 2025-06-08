window.addEventListener("DOMContentLoaded", function () {
    var canvas = document.createElement("canvas");
    canvas.id = "live2d";
    canvas.className = "live2d";
    canvas.width = 300;
    canvas.height = 400;
    canvas.style.position = "fixed";
    canvas.style.bottom = "0";
    canvas.style.right = "0";
    canvas.style.zIndex = "9999";
    canvas.style.pointerEvents = "auto"; // 允许鼠标事件
    document.body.appendChild(canvas);

    var script = document.createElement("script");
    script.src = "/js/live2d.js";
    script.onload = function () {
        loadlive2d("live2d", "/Pio/model.json");

        // 显示气泡的函数，传入文字内容和显示时长
        function showBubble(text, duration = 5000) {
            // 如果已有气泡，先删除
            var existing = document.getElementById("live2d-bubble");
            if (existing) existing.remove();

            var bubble = document.createElement("div");
            bubble.id = "live2d-bubble";
            bubble.style.position = "fixed";
            bubble.style.bottom = "270px"; // 靠近看板娘
            bubble.style.right = "10px";
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

        // 页面加载后 500ms 显示欢迎语
        setTimeout(() => {
            showBubble("欢迎来到我的网站！有什么需要帮忙的吗？");
        }, 500);

        // 30秒后，如果没显示其他气泡，再自动打招呼
        setTimeout(() => {
            showBubble("你已经在这里待了好久了，要不要站起来喝口水？", 7000);
        }, 600000);

        // 点击 canvas 时触发互动台词
        canvas.addEventListener("click", function () {
            showBubble("哎呀，不要戳我啦！");
        });
    };
    document.body.appendChild(script);
});
