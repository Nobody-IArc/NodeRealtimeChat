// 사용자가 속한 채팅방의 태그를 분석하는 코드

/**
 * @param {Array} joinedRooms
 * @returns {{
 *     tagCounts: Record<string, number>,
 *     topTag: string | null,
 *     comment: string
 * }}
 */
// 태그 분석
const analyzeTags = joinedRooms => {
    const tagCounts = {};

    // Room -> Tag 순회 및 tagCount[tagName] + 1 해줌
    joinedRooms.forEach(room => {
        room.tags.forEach(tag => {
            const tagName = tag.showName || tag.name;
            tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
        });
    });

    // 정렬된 태그 객체 -> 배열로 반환
    const sortedTag = Object.entries(tagCounts) // 객체 -> 배열
        .sort((a, b) => b[1] - a[1]);
    const topTagName = sortedTag.length > 0 ? sortedTag[0][0] : null;

    let comment = '';
    if (topTagName) {
        const tagInfo = joinedRooms
            .flatMap(room => room.tags)
            .find(
                tag => tag.showName === topTagName || tag.name === topTagName
            );

        comment = tagInfo?.comment || '다양한 주제에 참여하는 사용자입니다.';
    }

    return {
        tagCounts: tagCounts,
        topTag: topTagName,
        comment: comment,
    };
};

module.exports = analyzeTags;
