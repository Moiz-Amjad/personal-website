// Performance configuration constants
export const PERFORMANCE_CONFIG = {
  // Progressive loading delays (in milliseconds)
  LOADING_DELAYS: {
    HERO: 0,
    ABOUT: 800,
    EXPERIENCE: 1600,
    PROJECTS: 2400,
    SKILLS: 3200,
    EDUCATION: 4000,
    CONTACT: 4800
  },

  // 3D Component loading delays
  COMPONENT_DELAYS: {
    PARTICLES: 500,
    SPHERES: 1000,
    DRAGONS: 1500,
    FLYING_OBJECTS: 2000
  },

  // Device-specific settings
  MOBILE_SETTINGS: {
    maxParticles: 50,
    reducedAnimations: true,
    simplifiedShaders: true,
    lowerQuality: true
  },

  LOW_PERFORMANCE_SETTINGS: {
    maxParticles: 30,
    disable3D: true,
    disableParticles: true,
    disableComplexAnimations: true
  },

  HIGH_PERFORMANCE_SETTINGS: {
    maxParticles: 150,
    enable3D: true,
    enableParticles: true,
    enableComplexAnimations: true
  },

  // Performance thresholds
  THRESHOLDS: {
    LOW_FPS: 30,
    HIGH_FPS: 50,
    LOW_MEMORY: 4, // GB
    LOW_CPU_CORES: 4
  }
}

// Quality presets
export const QUALITY_PRESETS = {
  LOW: {
    particleCount: 30,
    animationSpeed: 0.5,
    enable3D: false,
    enableParticles: false,
    enableComplexAnimations: false
  },
  MEDIUM: {
    particleCount: 75,
    animationSpeed: 0.8,
    enable3D: true,
    enableParticles: true,
    enableComplexAnimations: true
  },
  HIGH: {
    particleCount: 150,
    animationSpeed: 1,
    enable3D: true,
    enableParticles: true,
    enableComplexAnimations: true
  }
} as const

export type QualityPreset = keyof typeof QUALITY_PRESETS 