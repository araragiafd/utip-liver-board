// ライバー掲示板のJavaScript

class LiverBoard {
    constructor() {
        this.livers = [];
        this.comments = {};
        this.init();
    }

    init() {
        this.loadSampleData();
        this.bindEvents();
        this.renderLivers();
    }

    // サンプルデータを読み込み
    loadSampleData() {
        // ライバーデータ
        this.livers = [
            {
                id: 1,
                name: "氷雨",
                description: "氷雨くん、他枠で見かけた時のくべくべ笑いをしてくれ頭おかしいと思った！あの笑い方は今でも忘れられてあかがかう？！あれからは全部見てるよ！れからもたくさん配信日を増やしてね！毎日のご配信日を楽しみにしてるよ！",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
                commentCount: 3
            },
            {
                id: 2,
                name: "瑠璃川あむ",
                description: "歌枠を見始めて1年半くらいになりますが、この人の歌声に魅了されています。特に感情を込めた歌い方が素晴らしく、聞いているだけで涙が出てきます。これからも応援しています！",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
                commentCount: 4
            },
            {
                id: 3,
                name: "ブライアン",
                description: "初見さんも常連さんも分け隔てなく接してくれるライバーさんです。雑談の内容も面白く、いつも楽しく配信を見させてもらっています。深夜の配信でも元気いっぱいで、見ているこちらも元気をもらえます！",
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
                commentCount: 5
            }
        ];

        // コメントデータ
        this.comments = {
            1: [
                {
                    id: 1,
                    content: "氷雨くんの笑い方、確かに特徴的ですよね！でもそれが魅力的で癖になります。毎回配信楽しみにしています。",
                    timestamp: new Date(Date.now() - 1000 * 60 * 60)
                },
                {
                    id: 2,
                    content: "あの笑い方分かります！最初はびっくりしたけど、今では氷雨くんの代名詞ですよね。配信頻度上がって嬉しいです。",
                    timestamp: new Date(Date.now() - 1000 * 60 * 30)
                },
                {
                    id: 3,
                    content: "氷雨くんの配信はいつも元気をもらえます。ゲームも上手だし、トークも面白いので毎日見てます！",
                    timestamp: new Date(Date.now() - 1000 * 60 * 15)
                }
            ],
            2: [
                {
                    id: 4,
                    content: "瑠璃川さんの歌声は本当に心に響きますね。特にバラードを歌っている時の表現力が素晴らしいです。",
                    timestamp: new Date(Date.now() - 1000 * 60 * 45)
                },
                {
                    id: 5,
                    content: "1年半も見続けているなんてすごいですね！私も最近ファンになりました。リクエストにも応えてくれて嬉しいです。",
                    timestamp: new Date(Date.now() - 1000 * 60 * 25)
                },
                {
                    id: 6,
                    content: "昨日の歌枠で涙が出ました。感情を込めた歌い方が本当に上手で、プロの歌手みたいです。",
                    timestamp: new Date(Date.now() - 1000 * 60 * 10)
                },
                {
                    id: 7,
                    content: "瑠璃川あむさんの歌声に癒されています。仕事で疲れた時に聞くと心が軽くなります。ありがとうございます。",
                    timestamp: new Date(Date.now() - 1000 * 60 * 5)
                }
            ],
            3: [
                {
                    id: 8,
                    content: "ブライアンさんの配信はいつも温かい雰囲気で癒されます。初見でも優しく迎えてくれて嬉しかったです。",
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
                },
                {
                    id: 9,
                    content: "深夜配信でも元気いっぱいなのがすごいです！夜勤の私にとってはとても心強い存在です。",
                    timestamp: new Date(Date.now() - 1000 * 60 * 50)
                },
                {
                    id: 10,
                    content: "雑談の内容がいつも面白くて、時間があっという間に過ぎてしまいます。話し方も聞きやすくて好きです。",
                    timestamp: new Date(Date.now() - 1000 * 60 * 35)
                },
                {
                    id: 11,
                    content: "ブライアンさんの人柄の良さが配信から伝わってきます。視聴者同士の交流も促してくれて、コミュニティが温かいです。",
                    timestamp: new Date(Date.now() - 1000 * 60 * 20)
                },
                {
                    id: 12,
                    content: "いつも元気をもらっています！落ち込んだ時にブライアンさんの配信を見ると前向きになれます。",
                    timestamp: new Date(Date.now() - 1000 * 60 * 8)
                }
            ]
        };
    }

    // イベントリスナーを設定
    bindEvents() {
        // ライバー追加ボタン
        document.getElementById('addLiverBtn').addEventListener('click', () => {
            this.showLiverModal();
        });

        // モーダルを閉じる
        document.getElementById('closeLiverModal').addEventListener('click', () => {
            this.hideLiverModal();
        });

        document.getElementById('closeCommentModal').addEventListener('click', () => {
            this.hideCommentModal();
        });

        document.getElementById('closeDetailModal').addEventListener('click', () => {
            this.hideDetailModal();
        });

        // モーダルオーバーレイをクリックして閉じる
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // フォーム送信
        document.getElementById('liverForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitLiver();
        });

        document.getElementById('commentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitComment();
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

        // リアルタイム検索
        document.getElementById('liverSearch').addEventListener('input', () => {
            this.searchLivers();
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

    // コメント追加モーダルを表示
    showCommentModal(liverId) {
        const liver = this.livers.find(l => l.id === liverId);
        if (liver) {
            document.getElementById('commentModalTitle').textContent = `${liver.name}にコメントを追加`;
            document.getElementById('commentLiverId').value = liverId;
            document.getElementById('commentModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // コメント追加モーダルを非表示
    hideCommentModal() {
        document.getElementById('commentModal').classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('commentForm').reset();
    }

    // ライバー詳細モーダルを表示
    showDetailModal(liverId) {
        const liver = this.livers.find(l => l.id === liverId);
        if (liver) {
            document.getElementById('liverDetailTitle').textContent = liver.name;
            this.renderLiverDetail(liver);
            document.getElementById('liverDetailModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // ライバー詳細モーダルを非表示
    hideDetailModal() {
        document.getElementById('liverDetailModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // 新規ライバーを追加
    submitLiver() {
        const name = document.getElementById('liverName').value.trim();
        const description = document.getElementById('liverDescription').value.trim();

        if (!name || !description) {
            alert('すべての項目を入力してください。');
            return;
        }

        const newLiver = {
            id: this.livers.length + 1,
            name,
            description,
            timestamp: new Date(),
            commentCount: 0
        };

        this.livers.unshift(newLiver);
        this.comments[newLiver.id] = [];
        this.renderLivers();
        this.hideLiverModal();
        this.showNotification('ライバーが追加されました！');
    }

    // コメントを追加
    submitComment() {
        const liverId = parseInt(document.getElementById('commentLiverId').value);
        const content = document.getElementById('commentContent').value.trim();

        if (!content) {
            alert('コメントを入力してください。');
            return;
        }

        const newComment = {
            id: Date.now(),
            content,
            timestamp: new Date()
        };

        if (!this.comments[liverId]) {
            this.comments[liverId] = [];
        }

        this.comments[liverId].push(newComment);

        // ライバーのコメント数を更新
        const liver = this.livers.find(l => l.id === liverId);
        if (liver) {
            liver.commentCount = this.comments[liverId].length;
        }

        this.renderLivers();
        this.hideCommentModal();
        this.showNotification('コメントが追加されました！');
    }

    // ライバーを検索
    searchLivers() {
        const query = document.getElementById('liverSearch').value.toLowerCase().trim();
        this.renderLivers(query);
    }

    // ライバー一覧を表示
    renderLivers(searchQuery = '') {
        const container = document.getElementById('liverGrid');
        let filteredLivers = this.livers;

        // 検索フィルター
        if (searchQuery) {
            filteredLivers = filteredLivers.filter(liver => 
                liver.name.toLowerCase().includes(searchQuery) ||
                liver.description.toLowerCase().includes(searchQuery)
            );
        }

        // 検索結果を表示
        const resultText = searchQuery ? `検索結果：${filteredLivers.length}件` : '検索結果：';
        document.getElementById('searchResults').textContent = resultText;

        if (filteredLivers.length === 0) {
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <div class="empty-state-icon">🔍</div>
                    <p>該当するライバーが見つかりませんでした。</p>
                </div>
            `;
        } else {
            container.innerHTML = filteredLivers.map(liver => this.createLiverCardHTML(liver)).join('');
            this.bindLiverActions();
        }
    }

    // ライバーカードHTMLを生成
    createLiverCardHTML(liver) {
        const commentCount = this.comments[liver.id] ? this.comments[liver.id].length : 0;
        
        return `
            <div class="liver-card" data-id="${liver.id}">
                <div class="liver-card-header">
                    <div class="liver-card-title">紹介したいライバー</div>
                    <h3 class="liver-name">${this.escapeHtml(liver.name)}</h3>
                    <div class="liver-meta">コメント・エピソード</div>
                </div>
                
                <div class="liver-description">
                    ${this.escapeHtml(liver.description)}
                </div>
                
                <div class="liver-stats">
                    <div class="comment-count">
                        💬 ${commentCount}件のコメント
                    </div>
                    <div class="post-time">
                        📅 ${this.formatTime(liver.timestamp)}
                    </div>
                </div>
                
                <div class="liver-actions">
                    <button class="action-btn view-liver-btn" data-liver-id="${liver.id}">
                        詳細を見る (${commentCount})
                    </button>
                    <button class="action-btn primary comment-liver-btn" data-liver-id="${liver.id}">
                        コメント追加
                    </button>
                </div>
            </div>
        `;
    }

    // ライバーアクションのイベントリスナーを設定
    bindLiverActions() {
        document.querySelectorAll('.view-liver-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const liverId = parseInt(e.currentTarget.dataset.liverId);
                this.showDetailModal(liverId);
            });
        });

        document.querySelectorAll('.comment-liver-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const liverId = parseInt(e.currentTarget.dataset.liverId);
                this.showCommentModal(liverId);
            });
        });

        document.querySelectorAll('.liver-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const liverId = parseInt(card.dataset.id);
                    this.showDetailModal(liverId);
                }
            });
        });
    }

    // ライバー詳細を表示
    renderLiverDetail(liver) {
        const comments = this.comments[liver.id] || [];
        
        const detailHTML = `
            <div class="liver-detail-header">
                <h3 class="liver-detail-name">${this.escapeHtml(liver.name)}</h3>
                
                <div class="liver-detail-description">
                    <h4 style="margin-bottom: 10px; color: #666; font-size: 14px;">最初の投稿</h4>
                    <p>${this.escapeHtml(liver.description)}</p>
                    <div style="margin-top: 15px; font-size: 14px; color: #999;">
                        ${this.formatTime(liver.timestamp)}
                    </div>
                </div>
            </div>
            
            <div class="comments-section">
                <div class="comments-header">
                    <h4>コメント・エピソード (${comments.length}件)</h4>
                    <button class="action-btn primary" onclick="liverBoard.showCommentModal(${liver.id}); liverBoard.hideDetailModal();">
                        コメント追加
                    </button>
                </div>
                
                ${comments.length === 0 ? 
                    '<div class="empty-state"><p>まだコメントがありません。<br>最初のコメントを投稿してみませんか？</p></div>' :
                    comments.map((comment, index) => `
                        <div class="comment-item">
                            <div class="comment-header">
                                <div>
                                    <span class="comment-number">${index + 1}</span>
                                    <span class="comment-label">コメント</span>
                                </div>
                                <span class="comment-time">${this.formatTime(comment.timestamp)}</span>
                            </div>
                            <div class="comment-content">
                                ${this.escapeHtml(comment.content)}
                            </div>
                        </div>
                    `).join('')
                }
            </div>
        `;

        document.getElementById('liverDetailContent').innerHTML = detailHTML;
    }

    // 通知を表示
    showNotification(message) {
        // 既存の通知を削除
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
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

// グローバル変数として設定
let liverBoard;

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    liverBoard = new LiverBoard();
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