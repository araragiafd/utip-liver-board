// ライバー掲示板のJavaScript

class LiverBoard {
    constructor() {
        this.posts = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadSamplePosts();
        this.bindEvents();
        this.renderPosts();
    }

    // サンプル投稿データを読み込み
    loadSamplePosts() {
        this.posts = [
            {
                id: 1,
                title: "新人ライバーです！よろしくお願いします",
                content: "はじめまして！今日からライブ配信を始めました。ゲーム配信をメインにやっていく予定です。みなさんよろしくお願いします！",
                author: "新人ゲーマー",
                category: "gaming",
                timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分前
                likes: 5,
                comments: 3
            },
            {
                id: 2,
                title: "歌配信のコツを教えてください",
                content: "歌配信を始めたいのですが、機材や配信設定について教えてもらえませんか？おすすめのマイクなどがあれば知りたいです。",
                author: "歌姫志望",
                category: "music",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2時間前
                likes: 12,
                comments: 8
            },
            {
                id: 3,
                title: "雑談配信で話すネタが尽きてしまいます",
                content: "雑談配信をしているのですが、話すネタがなくなってしまうことがあります。みなさんはどんな話題で盛り上がっていますか？",
                author: "おしゃべり好き",
                category: "chat",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5時間前
                likes: 8,
                comments: 15
            },
            {
                id: 4,
                title: "お絵描き配信の画面共有方法",
                content: "デジタルイラストの制作過程を配信したいのですが、画面共有の設定がうまくいきません。OBSの設定方法を教えてください。",
                author: "絵描きライバー",
                category: "art",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8時間前
                likes: 6,
                comments: 4
            },
            {
                id: 5,
                title: "料理配信での注意点について",
                content: "料理配信を始めたいのですが、衛生面や安全面で気をつけるべきことはありますか？また、見やすいカメラアングルのコツも知りたいです。",
                author: "料理好きライバー",
                category: "cooking",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12時間前
                likes: 10,
                comments: 7
            }
        ];
    }

    // イベントリスナーを設定
    bindEvents() {
        // 新規投稿ボタン
        document.getElementById('newPostBtn').addEventListener('click', () => {
            this.showModal();
        });

        // モーダルを閉じる
        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideModal();
        });

        // モーダル外をクリックして閉じる
        document.getElementById('newPostModal').addEventListener('click', (e) => {
            if (e.target.id === 'newPostModal') {
                this.hideModal();
            }
        });

        // 投稿フォーム送信
        document.getElementById('postForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitPost();
        });

        // フィルターボタン
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // ナビゲーション
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActiveNav(e.target);
            });
        });
    }

    // モーダルを表示
    showModal() {
        document.getElementById('newPostModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // モーダルを非表示
    hideModal() {
        document.getElementById('newPostModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('postForm').reset();
    }

    // 新規投稿を送信
    submitPost() {
        const title = document.getElementById('postTitle').value;
        const category = document.getElementById('postCategory').value;
        const content = document.getElementById('postContent').value;
        const author = document.getElementById('authorName').value;

        if (!title || !category || !content || !author) {
            alert('すべての項目を入力してください。');
            return;
        }

        const newPost = {
            id: this.posts.length + 1,
            title,
            content,
            author,
            category,
            timestamp: new Date(),
            likes: 0,
            comments: 0
        };

        this.posts.unshift(newPost); // 新しい投稿を先頭に追加
        this.renderPosts();
        this.hideModal();
        
        // 成功メッセージ
        this.showNotification('投稿が完了しました！');
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

    // フィルターを設定
    setFilter(filter) {
        this.currentFilter = filter;
        
        // フィルターボタンのアクティブ状態を更新
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

        this.renderPosts();
    }

    // ナビゲーションのアクティブ状態を設定
    setActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    // 投稿を表示
    renderPosts() {
        const container = document.getElementById('postsContainer');
        const filteredPosts = this.currentFilter === 'all' 
            ? this.posts 
            : this.posts.filter(post => post.category === this.currentFilter);

        if (filteredPosts.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #666;">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>まだ投稿がありません。最初の投稿をしてみませんか？</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredPosts.map(post => this.createPostHTML(post)).join('');

        // 投稿アクションのイベントリスナーを追加
        this.bindPostActions();
    }

    // 投稿HTMLを生成
    createPostHTML(post) {
        const categoryNames = {
            gaming: 'ゲーム配信',
            music: '音楽配信',
            chat: '雑談配信',
            art: 'お絵描き配信',
            cooking: '料理配信',
            other: 'その他'
        };

        return `
            <article class="post" data-id="${post.id}">
                <div class="post-header">
                    <div>
                        <h3 class="post-title">${this.escapeHtml(post.title)}</h3>
                        <div class="post-meta">
                            <span class="post-author">
                                <i class="fas fa-user"></i> ${this.escapeHtml(post.author)}
                            </span>
                            <span class="post-time">
                                <i class="fas fa-clock"></i> ${this.formatTime(post.timestamp)}
                            </span>
                        </div>
                    </div>
                    <span class="post-category">${categoryNames[post.category]}</span>
                </div>
                <div class="post-content">
                    ${this.escapeHtml(post.content)}
                </div>
                <div class="post-actions">
                    <button class="post-action like-btn" data-id="${post.id}">
                        <i class="fas fa-heart"></i> ${post.likes}
                    </button>
                    <button class="post-action comment-btn" data-id="${post.id}">
                        <i class="fas fa-comment"></i> ${post.comments}
                    </button>
                    <button class="post-action share-btn" data-id="${post.id}">
                        <i class="fas fa-share"></i> シェア
                    </button>
                </div>
            </article>
        `;
    }

    // 投稿アクションのイベントリスナーを設定
    bindPostActions() {
        // いいねボタン
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = parseInt(e.currentTarget.dataset.id);
                this.likePost(postId);
            });
        });

        // コメントボタン
        document.querySelectorAll('.comment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = parseInt(e.currentTarget.dataset.id);
                this.showComments(postId);
            });
        });

        // シェアボタン
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const postId = parseInt(e.currentTarget.dataset.id);
                this.sharePost(postId);
            });
        });
    }

    // 投稿にいいねする
    likePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            post.likes++;
            this.renderPosts();
            this.showNotification('いいねしました！');
        }
    }

    // コメントを表示（簡易実装）
    showComments(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            alert(`「${post.title}」のコメント機能は開発中です。`);
        }
    }

    // 投稿をシェア
    sharePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            if (navigator.share) {
                navigator.share({
                    title: post.title,
                    text: post.content,
                    url: window.location.href
                });
            } else {
                // フォールバック: URLをクリップボードにコピー
                navigator.clipboard.writeText(window.location.href).then(() => {
                    this.showNotification('URLをクリップボードにコピーしました！');
                });
            }
        }
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

    .post {
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

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    new LiverBoard();
});

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