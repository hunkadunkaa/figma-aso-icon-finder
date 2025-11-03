figma.showUI(__html__, {
    width: 480, height: 650, title: "ASO Icon Finder",
});

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'import-multiple') {
        const items = msg.items;

        if (items.length === 0) return;

        figma.notify(`Đang chuẩn bị import ${items.length} icon(s)...`);
        const newNodes: SceneNode[] = [];

        for (const item of items) {
            try {
                await figma.createImageAsync(item.url).then(async (image) => {
                    const frame = figma.createFrame();
                    frame.fills = [];
                    frame.resize(512, 512);
                    frame.name = item.name + ' • ' + item.developer;

                    const rect = figma.createRectangle();
                    rect.resize(512, 512);
                    rect.name = '512x512';
                    rect.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: image.hash }];

                    frame.appendChild(rect);

                    rect.x = (frame.width - rect.width) / 2;
                    rect.y = (frame.height - rect.height) / 2;

                    newNodes.push(frame);
                });
            } catch (e) {
                console.error(`Không thể tải icon cho: ${item.name}`, e);
                figma.notify(`Lỗi khi tải icon cho "${item.name}"`, { error: true });
            }
        }

        const center = figma.viewport.center;
        const iconSize = 512;
        const spacing = 60;
        const totalWidth = newNodes.length * iconSize + (newNodes.length - 1) * spacing;
        let startX = center.x - totalWidth / 2;

        const y = center.y - iconSize / 2; // để cho nó nằm giữa viewport

        for (const node of newNodes) {
            node.x = startX;
            node.y = y;
            startX += iconSize + spacing;
        }


        if (newNodes.length > 0) {
            figma.currentPage.selection = newNodes; // Chọn tất cả các icon mới
            figma.viewport.scrollAndZoomIntoView(newNodes);
            figma.notify(`✅ Đã import thành công ${newNodes.length} icon.`, { timeout: 3000 });
        } else {
            figma.notify(`❌ Không nhập được icon nào.`, { error: true });
        }
    }
};