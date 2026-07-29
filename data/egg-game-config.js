/*
 * Copy/config for the Hidden Egg MVP.
 * Kept outside the UI logic so the voice can be revised without touching state.
 */
(function exposeEggGameConfig(root) {
  'use strict';

  root.ANHLI_EGG_GAME_CONFIG = {
    ariaLabel: 'Khám phá vật nhỏ nằm giữa cỏ',
    microcopy: {
      firstDiscovery: [
        'Bạn vừa tìm thấy một quả trứng.',
        'Nó chưa biết bạn là ai.',
        'Nhưng hình như nó đã nghe thấy bạn.'
      ],
      sameDay: [
        'Hôm nay nó đã đủ ấm rồi.',
        'Thử ghé lại vào một ngày khác nha.'
      ],
      stages: {
        2: ['Có một tiếng tách rất khẽ.'],
        3: ['Có điều gì đó đang chờ được sinh ra.']
      }
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
