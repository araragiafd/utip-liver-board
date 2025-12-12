// ライバー評価掲示板のJavaScript

class LiverReviewBoard {
    constructor() {
        this.livers = [];
        this.reviews = [];
        this.currentSort = 'popular';
        this.selectedRating = 0;
        this.init();
    }

    init() {
        this.loadSampleData();
        this.bindEvents();
        this.renderLivers();
        this.renderPopularLivers();
        this.renderRecentReviews();
    }

    // サンプルデータを読み込み
    loadSampleData() {
        // ライバーデータ
        this.livers = [
            {
                id: 1,
                name: "ゲーミング太郎",
                category: "gaming",
                platform: "youtube",
                description: "FPSゲームを中心に配信している熱血ゲーマー。視聴者との交流を大切にしています。",
                avatar: "https://via.placeholder.com/60x60",
                totalReviews: 25,
                averageRating: 4.2,
                addedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30) // 30日前
            },
            {
                id: 2,
                name: "歌姫ちゃん",
                category: "music",
                platform: "twitch",
                description: "アニソンやボカロ曲を中心に歌配信をしています。リクエストも受け付けています！",
                avatar: "https://via.placeholder.com/60x60",
                totalReviews: 42,
                averageRating: 4.7,
                addedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60) // 60日前
            },
            {
                id: 3,
                name: "まったり雑談マン",
                category: "chat",
                platform: "niconico",
                description: "深夜の雑談配信が人気。リスナーとのゆるい会話が魅力です。",
                avatar: "https://via.placeholder.com/60x60",
                totalReviews: 18,
                averageRating: 4.0,
                addedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15) // 15日前
            },
            {
                id: 4,
                name: "お絵描きアーティスト",
                category: "art",
                platform: "youtube",
                description: "イラスト制作過程を配信。初心者向けの描き方講座も人気です。",
                avatar: "https://via.placeholder.com/60x60",
                totalReviews: 33,
                averageRating: 4.5,
                addedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45) // 45日前
            },
            {
                id: 5,
                name: "料理系ライバー",
                category: "cooking",
                platform: "openrec",
                description: "簡単で美味しい料理を作りながら配信。レシピも公開しています。",
                avatar: "https://via.placeholder.com/60x60",
                totalReviews: 21,
                averageRating: 4.3,
                addedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20) // 20日前
            }
        ];

        // レビューデータ
        this.reviews = [
            {
                id: 1,
                liverId: 1,
                title: "とても面白い配信です！",
                content: "ゲームの腕前もさることながら、トークも面白くて毎回楽しく見させてもらっています。",
                rating: 5,
                reviewer: "ゲーム好き視聴者",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2時間前
            },
            {
                id: 2,
                liverId: 2,
                title: "歌声が素晴らしい",
                content: "透明感のある歌声で、聞いていてとても癒されます。リクエストにも応えてくれて嬉しいです。",
                rating: 5,
                reviewer: "音楽ファン",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5時間前
            },
            {
                id: 3,
                liverId: 3,
                title: "まったりできる配信",
                content: "仕事で疲れた時に見ると、とてもリラックスできます。雑談の内容も面白いです。",
                rating: 4,
                reviewer: "会社員視聴者",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8) // 8時間前
            },
            {
                id: 4,
                liverId: 4,
                title: "絵の上達に役立つ",
                content: "描き方のコツを丁寧に説明してくれるので、とても勉強になります。",
                rating: 4,
                reviewer: "絵描き初心者",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12) // 12時間前
            },
            {
                id: 5,
                liverId: 5,
                title: "料理のレパートリーが増えた",
                content: "簡単で美味しそうな料理をたくさん教えてもらいました。実際に作ってみたら美味しかったです！",
                rating: 4,
                reviewer: "料理好き",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1日前
            }
        ];
    }

    // イベントリスナーを設定
    bindEvents() {
        // ライバー追加ボタン
        document.getElementById('addLiverBtn').addEventListener('click', () => {
            this.showLiverModal();
        });

        // ライバー追加モーダルを閉じる
        document.getElementById('closeLiverModal').addEventListener('click', () => {
            this.hideLiverModal();
        });

        // レビューモーダルを閉じる
        document.getElementById('closeReviewModal').addEventListener('click', () => {
            this.hideReviewModal();
        });

        // モーダル外をクリックして閉じる
        document.getElementById('addLiverModal').addEventListener('click', (e) => {
            if (e.target.id === 'addLiverModal') {
                this.hideLiverModal();
            }
        });

        document.getElementById('reviewModal').addEventListener('click', (e) => {
            if (e.target.id === 'reviewModal') {
                this.hideReviewModal();
            }
        });

        // ライバー追加フォーム送信
        document.getElementById('liverForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitLiver();
        });

        // レビューフォーム送信
        document.getElementById('reviewForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitReview();
        });

        // ソートボタン
        document.querySelectorAll('[data-sort]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setSort(e.target.dataset.sort);
            });
        });

        // 検索機能
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.searchLivers();
        });

        document.getElementById('liverSearch').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchLivers();
            }
        });

        // 星評価
        document.querySelectorAll('#starRating .star').forEach(star => {
            star.addEventListener('click', (e) => {
                this.setRating(parseInt(e.target.dataset.rating));
            });

            star.addEventListener('mouseover', (e) => {
                this.highlightStars(parseInt(e.target.dataset.rating));
            });
        });

        document.getElementById('starRating').addEventListener('mouseleave', () => {
            this.highlightStars(this.selectedRating);
        });

        // ナビゲーション
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveNav(e.target);
            });
        });
    }

// アニメーション用CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .notification {
        animation: slideIn 0.3s ease;
    }

    .liver-card {
        animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// PWA対応（Service Worker登録）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
    // ライバー追加モーダルを表示
    showLiverModal() {
        document.getElementById('addLiverModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // ライバー追加モーダルを非表示
    hideLiverModal() {
        document.getElementById('addLiverModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('liverForm').reset();
    }

    // レビューモーダルを表示
    showReviewModal(liverId) {
        const liver = this.livers.find(l => l.id === liverId);
        if (liver) {
            document.getElementById('reviewModalTitle').textContent = `${liver.name}のレビューを投稿`;
            document.getElementById('reviewLiverId').value = liverId;
            document.getElementById('reviewModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // レビューモーダルを非表示
    hideReviewModal() {
        document.getElementById('reviewModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('reviewForm').reset();
        this.selectedRating = 0;
        this.highlightStars(0);
    }

    // 新規ライバーを追加
    submitLiver() {
        const name = document.getElementById('liverName').value;
        const category = document.getElementById('liverCategory').value;
        const platform = document.getElementById('liverPlatform').value;
        const description = document.getElementById('liverDescription').value;

        if (!name || !category || !platform) {
            alert('必須項目を入力してください。');
            return;
        }

        const newLiver = {
            id: this.livers.length + 1,
            name,
            category,
            platform,
            description: description || 'まだ説明がありません。',
            avatar: 'https://via.placeholder.com/60x60',
            totalReviews: 0,
            averageRating: 0,
            addedDate: new Date()
        };

        this.livers.unshift(newLiver);
        this.renderLivers();
        this.renderPopularLivers();
        this.hideLiverModal();
        this.showNotification('ライバーが追加されました！');
    }

    // レビューを投稿
    submitReview() {
        const liverId = parseInt(document.getElementById('reviewLiverId').value);
        const title = document.getElementById('reviewTitle').value;
        const content = document.getElementById('reviewContent').value;
        const reviewer = document.getElementById('reviewerName').value;
        const rating = this.selectedRating;

        if (!title || !content || !reviewer || !rating) {
            alert('すべての項目を入力してください。');
            return;
        }

        const newReview = {
            id: this.reviews.length + 1,
            liverId,
            title,
            content,
            rating,
            reviewer,
            timestamp: new Date()
        };

        this.reviews.unshift(newReview);
        this.updateLiverRating(liverId);
        this.renderLivers();
        this.renderPopularLivers();
        this.renderRecentReviews();
        this.hideReviewModal();
        this.showNotification('レビューが投稿されました！');
    }

    // ライバーの評価を更新
    updateLiverRating(liverId) {
        const liver = this.livers.find(l => l.id === liverId);
        const liverReviews = this.reviews.filter(r => r.liverId === liverId);
        
        if (liver && liverReviews.length > 0) {
            const totalRating = liverReviews.reduce((sum, review) => sum + review.rating, 0);
            liver.averageRating = totalRating / liverReviews.length;
            liver.totalReviews = liverReviews.length;
        }
    }

    // 星評価を設定
    setRating(rating) {
        this.selectedRating = rating;
        document.getElementById('reviewRating').value = rating;
        this.highlightStars(rating);
    }

    // 星をハイライト
    highlightStars(rating) {
        document.querySelectorAll('#starRating .star').forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // ソートを設定
    setSort(sort) {
        this.currentSort = sort;
        
        document.querySelectorAll('[data-sort]').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-sort="${sort}"]`).classList.add('active');

        this.renderLivers();
    }

    // ライバーを検索
    searchLivers() {
        const query = document.getElementById('liverSearch').value.toLowerCase();
        this.renderLivers(query);
    }

    // ライバー一覧を表示
    renderLivers(searchQuery = '') {
        const container = document.getElementById('liversGrid');
        let filteredLivers = this.livers;

        // 検索フィルター
        if (searchQuery) {
            filteredLivers = filteredLivers.filter(liver => 
                liver.name.toLowerCase().includes(searchQuery) ||
                liver.description.toLowerCase().includes(searchQuery)
            );
        }

        // ソート
        filteredLivers = this.sortLivers(filteredLivers);

        if (filteredLivers.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #666;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>該当するライバーが見つかりませんでした。</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredLivers.map(liver => this.createLiverCardHTML(liver)).join('');
        this.bindLiverActions();
    }

    // ライバーをソート
    sortLivers(livers) {
        switch (this.currentSort) {
            case 'popular':
                return livers.sort((a, b) => b.totalReviews - a.totalReviews);
            case 'newest':
                return livers.sort((a, b) => b.addedDate - a.addedDate);
            case 'rating':
                return livers.sort((a, b) => b.averageRating - a.averageRating);
            case 'reviews':
                return livers.sort((a, b) => b.totalReviews - a.totalReviews);
            default:
                return livers;
        }
    }

    // ライバーカードHTMLを生成
    createLiverCardHTML(liver) {
        const platformNames = {
            youtube: 'YouTube',
            twitch: 'Twitch',
            niconico: 'ニコニコ生放送',
            mildom: 'Mildom',
            openrec: 'OPENREC',
            other: 'その他'
        };

        const categoryNames = {
            gaming: 'ゲーム配信',
            music: '音楽配信',
            chat: '雑談配信',
            art: 'お絵描き配信',
            cooking: '料理配信',
            other: 'その他'
        };

        return `
            <div class="liver-card" data-id="${liver.id}">
                <div class="liver-header">
                    <img src="${liver.avatar}" alt="${liver.name}" class="liver-avatar">
                    <div class="liver-info">
                        <h3>${this.escapeHtml(liver.name)}</h3>
                        <div class="liver-platform">${platformNames[liver.platform]}</div>
                    </div>
                </div>
                
                <div class="liver-rating">
                    <div class="stars">${this.generateStars(liver.averageRating)}</div>
                    <span class="rating-text">${liver.averageRating.toFixed(1)} (${liver.totalReviews}件)</span>
                </div>
                
                <div class="liver-stats">
                    <div class="stat-item">
                        <div class="stat-value">${liver.totalReviews}</div>
                        <div class="stat-label">レビュー</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${liver.averageRating.toFixed(1)}</div>
                        <div class="stat-label">評価</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${categoryNames[liver.category]}</div>
                        <div class="stat-label">カテゴリ</div>
                    </div>
                </div>
                
                <div class="liver-description">
                    ${this.escapeHtml(liver.description)}
                </div>
                
                <div class="liver-actions">
                    <button class="btn-secondary review-btn" data-liver-id="${liver.id}">
                        <i class="fas fa-star"></i> レビューする
                    </button>
                    <button class="btn-secondary view-reviews-btn" data-liver-id="${liver.id}">
                        <i class="fas fa-eye"></i> レビュー見る
                    </button>
                </div>
            </div>
        `;
    }

    // 星を生成
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        if (hasHalfStar) {
            stars += '☆';
        }
        for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
            stars += '☆';
        }

        return stars;
    }

    // ライバーアクションのイベントリスナーを設定
    bindLiverActions() {
        document.querySelectorAll('.review-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const liverId = parseInt(e.currentTarget.dataset.liverId);
                this.showReviewModal(liverId);
            });
        });

        document.querySelectorAll('.view-reviews-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const liverId = parseInt(e.currentTarget.dataset.liverId);
                this.showLiverReviews(liverId);
            });
        });
    }

    // ライバーのレビューを表示
    showLiverReviews(liverId) {
        const liver = this.livers.find(l => l.id === liverId);
        const liverReviews = this.reviews.filter(r => r.liverId === liverId);
        
        if (liverReviews.length === 0) {
            alert(`${liver.name}のレビューはまだありません。最初のレビューを投稿してみませんか？`);
            return;
        }

        let reviewsHTML = `<h3>${liver.name}のレビュー (${liverReviews.length}件)</h3>\n\n`;
        liverReviews.forEach(review => {
            reviewsHTML += `【${review.title}】\n`;
            reviewsHTML += `評価: ${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}\n`;
            reviewsHTML += `${review.content}\n`;
            reviewsHTML += `投稿者: ${review.reviewer} (${this.formatTime(review.timestamp)})\n\n`;
        });

        alert(reviewsHTML);
    }

    // 人気ライバーを表示
    renderPopularLivers() {
        const container = document.getElementById('popularLivers');
        const popularLivers = this.livers
            .sort((a, b) => b.averageRating - a.averageRating)
            .slice(0, 5);

        container.innerHTML = popularLivers.map(liver => `
            <div class="liver-card" style="margin-bottom: 1rem; cursor: pointer;" onclick="document.querySelector('[data-liver-id=\\"${liver.id}\\"] .review-btn').click()">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <img src="${liver.avatar}" alt="${liver.name}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">
                    <div>
                        <h4 style="margin: 0; font-size: 0.9rem;">${this.escapeHtml(liver.name)}</h4>
                        <div style="color: #ffd700; font-size: 0.8rem;">${this.generateStars(liver.averageRating)} ${liver.averageRating.toFixed(1)}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 最新レビューを表示
    renderRecentReviews() {
        const container = document.getElementById('recentReviews');
        const recentReviews = this.reviews
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 5);

        container.innerHTML = recentReviews.map(review => {
            const liver = this.livers.find(l => l.id === review.liverId);
            return `
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-liver">${liver ? liver.name : '不明'}</span>
                        <span class="review-rating">${'★'.repeat(review.rating)}</span>
                    </div>
                    <div class="review-text">${this.escapeHtml(review.title)}</div>
                </div>
            `;
        }).join('');
    }

    // 通知を表示
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // ナビゲーションのアクティブ状態を設定
    setActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // HTMLエスケープ
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 時間をフォーマット
    formatTime(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 1) return 'たった今';
        if (minutes < 60) return `${minutes}分前`;
        if (hours < 24) return `${hours}時間前`;
        if (days < 7) return `${days}日前`;
        
        return timestamp.toLocaleDateString('ja-JP');
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    new LiverReviewBoard();
});