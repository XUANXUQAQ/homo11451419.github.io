<template>
  <div class="min-h-screen font-sans p-5 sm:p-10 flex items-center justify-center">
    <div class="container max-w-5xl mx-auto" @mousemove="onMouseMove" @mouseleave="onMouseLeave" :style="cardStyle"
      ref="cardRef">
      <div
        class="card flex flex-col md:flex-row gap-px rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <!-- Left Panel -->
        <aside
          class="left flex-none md:w-80 p-9 flex flex-col items-center text-center bg-gradient-to-b from-white/[.02] to-black/[.03] reveal-parent">
          <div
            class="avatar w-36 h-36 rounded-full grid place-items-center text-6xl font-bold text-gray-800 bg-gradient-to-br from-accent1 via-pink-400 to-accent2 p-1.5 shadow-lg transition-transform duration-300 hover:scale-110">
            H
          </div>
          <div class="name mt-4 text-2xl font-bold tracking-wide text-white">homo11451419</div>
          <div class="handle mt-1.5 text-sm text-muted">@某普通人</div>
          <div class="badges flex gap-2 mt-4 flex-wrap justify-center">
            <span v-for="badge in badges" :key="badge"
              class="badge bg-white/10 px-3 py-2 rounded-full text-xs text-slate-300 border border-white/10 transition-all duration-300 hover:bg-white/20 hover:border-white/20 hover:scale-105">
              {{ badge }}
            </span>
          </div>
          <div class="stats flex gap-3 mt-4">
            <div v-for="stat in stats" :key="stat.label"
              class="stat bg-white/[.03] p-3 rounded-lg text-center min-w-[82px] transition-all duration-300 hover:bg-white/10 hover:scale-105">
              <div class="num text-xl font-bold text-white">{{ stat.value }}</div>
              <div class="label text-xs text-muted mt-1.5">{{ stat.label }}</div>
            </div>
          </div>
        </aside>

        <!-- Right Panel -->
        <main class="right flex-1 p-9 flex flex-col justify-between bg-black/10 reveal-parent">
          <div>
            <div class="header-row">
              <div>
                <div class="title text-xl font-bold text-white">你好，我是 <strong>homo11451419</strong></div>
                <div class="subtitle mt-1.5 text-sm text-muted">菜狗</div>
              </div>
            </div>
            <div class="bio mt-4 text-slate-300 leading-relaxed text-base">
              我是homo11451419，一名GitHub上的新人。这个页面主要用于托管两个有趣的小项目（MIT 协议）。你可以通过下方的按钮直接访问生成器或跳转到视频。项目源码也放在仓库里，欢迎提建议或提个 Star
              ❤️。
            </div>
            <div class="projects grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-5">
              <div v-for="project in projects" :key="project.title"
                class="project flex flex-col justify-between bg-gradient-to-b from-white/[.02] to-black/[.03] p-3.5 rounded-xl border border-white/10 reveal-parent transition-all duration-300 hover:border-white/20 hover:scale-[1.02]">
                <div>
                  <h3 class="font-bold text-base text-white">{{ project.title }}</h3>
                  <p class="mt-1.5 text-sm text-muted flex-grow">{{ project.description }}</p>
                </div>
                <div class="mt-2.5 flex gap-2">
                  <a :href="project.url" target="_blank" rel="noopener noreferrer" class="btn secondary text-sm">访问</a>
                </div>
              </div>
            </div>
            <div class="btn-row mt-4 flex gap-3 flex-wrap">
              <a href="https://linux.do/u/is_hp" target="_blank" rel="noopener noreferrer" class="btn linux">个人 LINUX DO
                社区首页</a>
              <a href="https://github.com/homo11451419/homo11451419.github.io" target="_blank" rel="noopener noreferrer"
                class="btn">查看仓库</a>
            </div>
          </div>
          <div
            class="card-footer mt-4 pt-4 border-t border-dashed border-white/10 flex justify-between items-center text-sm text-muted">
            <div>© {{ new Date().getFullYear() }} homo11451419 · MIT</div>
            <div>Made with ❤️ · Vue.js · Tailwind</div>
          </div>
        </main>
      </div>
    </div>
    <div
      class="fixed bottom-3 right-4 text-xs text-slate-500/50 hover:text-slate-400/80 transition-colors duration-300 cursor-default select-none">
      made by XUANXUQAQ
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const cardRef = ref<HTMLElement | null>(null);
const mouse = ref({ x: 0, y: 0 });
const isHovering = ref(false);

const onMouseMove = (event: MouseEvent) => {
  if (!cardRef.value) return;
  isHovering.value = true;
  const rect = cardRef.value.getBoundingClientRect();
  mouse.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const onMouseLeave = () => {
  isHovering.value = false;
};

const cardStyle = computed(() => {
  if (!cardRef.value || !isHovering.value) {
    return {
      '--mouse-x': '50%',
      '--mouse-y': '50%',
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    };
  }
  const { x, y } = mouse.value;
  const { offsetWidth: width, offsetHeight: height } = cardRef.value;
  const rotateX = ((y / height) - 0.5) * -10; // Invert for natural feel
  const rotateY = ((x / width) - 0.5) * 20;

  return {
    '--mouse-x': `${x}px`,
    '--mouse-y': `${y}px`,
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
    transition: 'transform 0.1s linear',
  };
});


const badges = ref(['GitHub 新人', 'MIT 协议', '正在学习']);

const stats = ref([
  { value: 0, label: '项目经验' },
  { value: 0, label: '技术技能' },
  { value: '?', label: '还在摸索' },
]);

const projects = ref([
  {
    title: '65 生成器',
    description: '通过输入数字生成“6512345”的数字经过重重变换的结果',
    url: '65gen-master/index.html',
  },
  {
    title: '114514 生成器',
    description: '和前面一样，只是数字变为了114514',
    url: 'homo-master/index.html',
  },
  {
    title: '随机跳转视频',
    description: '随机跳转到 Never Gonna Give You Up 或 Are You OK? 的页面。',
    url: 'random_jump_to_bilibili_videos_never_gonna_give_up_or_are_you_ok.html',
  },
]);
</script>

<style scoped>
.card {
  position: relative;
  transform-style: preserve-3d;
}

.card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  /* 16px */
  background: radial-gradient(350px circle at var(--mouse-x) var(--mouse-y),
      rgba(124, 58, 237, 0.15),
      transparent 80%);
  opacity: 0;
  transition: opacity 0.5s;
  z-index: 0;
}

.container:hover .card::before {
  opacity: 1;
}

.reveal-parent:hover .reveal-parent,
.reveal-parent {
  position: relative;
}

.reveal-parent::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: radial-gradient(250px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.1),
      transparent 80%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

.container:hover .reveal-parent::after {
  opacity: 1;
}


.btn {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  padding: 11px 18px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent1), var(--accent2));
  color: white;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 8px 18px rgba(7, 11, 30, 0.6);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  position: relative;
  z-index: 1;
}

.btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 18px 30px rgba(7, 11, 30, 0.7);
}

.btn.secondary {
  background: linear-gradient(90deg, #334155, #0f1724);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn.linux {
  background: linear-gradient(90deg, #ffb86b, #ff6b6b);
  color: #081018;
}

/* Noise texture for material effect */
body::after {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>');
  opacity: 0.05;
  pointer-events: none;
  z-index: -1;
}
</style>
