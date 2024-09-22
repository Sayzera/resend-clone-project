function updateUrlParameter(param: string, value: string) {
    // Mevcut URL'yi alın
    const url = new URL(window.location.href);
  
    // Parametreyi güncelleyin veya ekleyin
    url.searchParams.set(param, value);
  
    // Güncellenmiş URL'yi tarayıcıya yansıtın
    window.history.pushState({}, '', url.toString());
  }

export {
    updateUrlParameter
}
