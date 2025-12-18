<template>
  <transition name="modal-fade">
    <div v-if="showModal" class="announcement-overlay" @click.self="closeModal">
      <div class="announcement-modal">
        <div class="modal-header">
          <h3>公告</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <h2>网站即将满月，感谢大家的使用!</h2>
          <p>1.账号系统制作中，以后可以登录MikuMod账号，记录学习时长等等</p>
          <p>2.学习时长记录推出！可以记录学习了多久以及完成的番茄数~</p>
          <p>3.桌面壁纸应用即将推出~</p>
          <p>制作了一个一键打开网站的快捷方式，可以一键开始学习＞﹏＜</p>
          <a class="notice-link" href="https://pan.quark.cn/s/f89e455f54b4" target="_blank" rel="noopener noreferrer">一键开始学习</a>
        </div>
        <div class="modal-footer">
          <button class="confirm-btn" @click="closeModal">我知道了</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'announcement_last_shown'
const INTERVAL_DAYS = 3

const showModal = ref(false)

const shouldShowAnnouncement = () => {
  const lastShown = localStorage.getItem(STORAGE_KEY)
  if (!lastShown) return true
  const daysPassed = (Date.now() - parseInt(lastShown)) / (1000 * 60 * 60 * 24)
  return daysPassed >= INTERVAL_DAYS
}

const closeModal = () => {
  showModal.value = false
  localStorage.setItem(STORAGE_KEY, Date.now().toString())
}

onMounted(() => {
  if (shouldShowAnnouncement()) {
    setTimeout(() => { showModal.value = true }, 500)
  }
})
</script>

<style scoped>
.announcement-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.7); display: flex; justify-content: center;
  align-items: center; z-index: 2000;
}
.announcement-modal {
  background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(30px);
  border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.2);
  width: 90%; max-width: 400px; overflow: hidden;
}
.modal-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.modal-header h3 { color: white; margin: 0; font-size: 1.1rem; }
.close-btn {
  background: none; border: none; color: white; font-size: 1.5rem;
  cursor: pointer; padding: 0.2rem; border-radius: 50%; width: 30px; height: 30px;
  display: flex; align-items: center; justify-content: center; transition: background 0.3s ease;
}
.close-btn:hover { background: rgba(255, 255, 255, 0.1); }
.modal-body { color: white; text-align: center; padding: 1.5rem; }
.modal-body h2 { margin: 0 0 1.5rem 0; font-size: 1.3rem; }
.modal-body p { margin: 0.8rem 0; line-height: 1.6; color: rgba(255, 255, 255, 0.8); font-size: 0.9rem; }
.notice-link {
  display: inline-block; margin-top: 1rem; padding: 0.8rem 1.5rem;
  background: rgba(41, 128, 185, 0.5); border: 1px solid rgba(41, 128, 185, 0.8);
  color: white; text-decoration: none; border-radius: 8px; transition: all 0.3s ease; font-size: 0.9rem;
}
.notice-link:hover { background: rgba(41, 128, 185, 0.7); transform: translateY(-2px); }
.modal-footer { padding: 1rem 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center; }
.confirm-btn {
  padding: 0.6rem 2rem; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(76, 175, 80, 0.3); color: white; font-size: 0.9rem;
  cursor: pointer; transition: all 0.3s ease;
}
.confirm-btn:hover { background: rgba(76, 175, 80, 0.5); }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
