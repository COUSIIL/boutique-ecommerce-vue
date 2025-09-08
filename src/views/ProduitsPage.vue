<template>

    <div v-show="isUpdating" ref="waiting" class="stickyWaiting"></div>

    
    
    <div v-if="route.params.id && !isUpdating && found" :id="route.params.id" style="width: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; margin-top: 20px;">
      
      <p class="title">
        {{ productList[indexed].name }}
      </p>

      <div class="flex-columns">
        
        <div class="center_column">
          <div v-if="!catalogIndex && productList[indexed].youtubeUrl" class="video-wrapper">
            <iframe
              :src="`https://www.youtube.com/embed/${videoId}`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="youtube-video"
            />

          </div>
          <div class="center_el" v-if="catalogIndex || !productList[indexed].youtubeUrl">

            <img
              v-if="productList[indexed].image.startsWith('https')"
              :src="productList[indexed].image"
              :alt="productList[indexed].name"
              class="product-image"
              loading="lazy"
              decoding="async"
            />
            <img
              v-else
              :src="'https://zoxcom.pietycloth.com' + productList[indexed].image"
              :alt="productList[indexed].name"
              class="product-image"
              loading="lazy"
              decoding="async"
            />

          </div>

          <div class="list2" style="height: 160px;">
        
            <div v-for="(catalog, index) in productList[indexed].catalog"
              :key="index"
              class="product-card"
            >
            <button v-if="catalog.image"
                      type="button"
                      class="catalog-button"
                      :class="{ selected: catalogIndex === index }"
                      @click="setCatalog(index)"
                    >
                      
                      <img
                        v-if="catalog.image.startsWith('https')"
                        :src="catalog.image"
                        :alt="index"
                        loading="lazy"
                        decoding="async"
                        class="model-image"
                      />
                      <img
                        v-else
                        :src="'https://zoxcom.pietycloth.com' + catalog.image"
                        :alt="index"
                        loading="lazy"
                        decoding="async"
                        class="model-image"
                      />
              </button>
            
            </div>
          </div>
        </div>
        <div style="display: flex; align-items: center; flex-direction: column;">
          <div class="selector">

          <div v-if="productList[indexed].models.length > 1">
                إختر المنتوج

                <div class="list2" style="height: 160px;">
                  <div
                    v-for="(product, index) in productList[indexed].models"
                    :key="index"
                    class="product-card"
                  >
                    <button v-if="product.modelActive === '1'"
                      type="button"
                      class="model-button"
                      :class="{ selected: productIndex === index }"
                      @click="setModel(index)"
                    >
                      
                      <img
                        v-if="product.image.startsWith('https')"
                        :src="product.image"
                        :alt="product.modelName"
                        loading="lazy"
                        decoding="async"
                        class="model-image"
                      />
                      <img
                        v-else
                        :src="'https://zoxcom.pietycloth.com' + product.image"
                        :alt="product.modelName"
                        loading="lazy"
                        decoding="async"
                        class="model-image"
                      />
                    </button>
                  </div>
              </div>
              </div>
              
            <div v-if="productList[indexed].models[productIndex].aColor == 1">
              <div class="list2">
                <div v-for="(color, index1) in colors" :key="index1"> 
                  <div class="miniBox">
                    <button type="button" class="colorBoxing"
                      :class="{ selected: colorIndex === index1 }"
                    :style="{ backgroundColor: color?.color || '#000' }"
                    @click="setColor(index1)">
                      
                    </button>      
                  </div>
                  
                </div>
              </div>
            </div>
            <div v-if="productList[indexed].models[productIndex].aSize == 1">
              <div class="list2">
                <div v-for="(size, index2) in sizes" :key="index2"> 
                  <div class="miniBox">
                    <button type="button" 
                    
                    class="centerBoxing" @click="setSize(index2)"
                    :class="{ selected: sizeIndex === index2 }">
                      <h5>
                        {{size.size}}
                      </h5>
                      
                    </button>      
                  </div>
                  
                </div>
              </div>
            </div>

            <div v-for="(select, index3) in selected" :key="index3">
                
              <div class="center_column2" @click="chosedDetails(index3)" :class="{ selected_el: selectedQty === index3 }">
                <div class="center_el" style="margin: 5px;">
                  <img
                    v-if="select.catalog_image"
                    :src="select.catalog_image"
                    :alt="select.colorName"
                    class="catalog-image"
                    loading="lazy"
                    decoding="async"
                  />
                  <img v-else 
                    :src="productList[indexed].models[productIndex].image"
                    :alt="select.colorName"
                    class="catalog-image"
                    loading="lazy"
                    decoding="async"
                  />

                  <div v-if="parseInt(select.promo) != 0" class="center_column">
                    <div class="model-price2">
                      <p class="promo">
                        Promo -{{ select.total - select.promo }} DA
                      </p>

                    </div>
                    <div class="model-price2">
                      <div class="scroll-wrapper" v-if="select.aColor">
                        <div class="content">
                          <div :style="{backgroundColor: select.color}" style="width: 10px; height: 10px; border: 1px solid lightGray">

                          </div>
                          <p class="scroll">
                            {{ select.colorName }}
                          </p>
                          
                        </div>
                      </div>
                      <div class="scroll-wrapper" v-if="select.size">
                        <div class="content">
                          <p>
                            {{ select.size }}
                          </p>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="center_column">

                      <p>
                        {{ select.modal_name }}
                      </p>

                    <div v-if="select.colorName || select.size" class="model-price2">
                      <div  v-if="select.colorName" class="scroll-wrapper">
                        <div class="content">
                          <div :style="{backgroundColor: select.color}" style="width: 10px; height: 10px; border: 1px solid lightGray">

                          </div>
                          <p class="scroll">
                            {{ select.colorName }}
                          </p>
                          
                        </div>
                      </div>
                      <div v-if="select.size" class="scroll-wrapper">
                        <div class="content">
                          <p>
                            {{ select.size }}
                          </p>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="center_el" style="margin: 5px;">

                  <div v-if="parseInt(select.promo) != 0" class="price-display">
                    <p class="old-price">{{ select.total }} DA</p>
                    <p class="promo-price">{{ select.promo }} DA</p>
                    
                  </div>
                  <div v-else>
                    <p class="promo-price" style="margin-block: 5px; background-color: greenyellow;">{{ select.total }} DA</p>
                  </div>


                  <div class="center_el3">
                    <button type="button" class="qtyBtn" @click="addQtySelect(index3)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="currentColor" fill="none">
                          <path d="M12.001 5.00003V19.002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M19.002 12.002L4.99998 12.002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>
                    <div class="formInput">
                  
                      <input v-if="select.qty" v-model="select.qty" type="number" min="1" step="1" class="w-full p-2 border rounded" style="max-width: 60px;" required @change="calculerPrix"/>
                    </div>

                    <button type="button" class="qtyBtn" @click="removeQtySelect(index3)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="currentColor" fill="none">
                          <path d="M19.002 12L5.00001 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                
                  

                <div v-if="select.modal_name && productList[indexed].models.length > 1 || colors.length > 1 || sizes.length > 1" class="center_el">
                  <p>
                    {{ select.modal_name }}
                  </p>
                </div>
                  
                
                
                
              </div>
              
            </div>
              
            
            <div v-if="productList[indexed].models[productIndex].details.length > 0" class="center_el">
              <button id="add" type="button" class="add_btn_model" @click="selectDetails(false, selected.length)">
                +
              </button>
            </div>
   
        </div>

        <div style="width: 100%; display: flex; justify-content: center; align-items: center;">
            <form v-if="selected.length < 2 && !colors.length && !sizes.length" @submit.prevent="submitOrder">
            
              <div ref="buyNowRef">
                <div class="center_el">
                  
                  <div class="formInput">
                  
                    <input v-model="order.nom" type="text" class="w-full p-2 border rounded" required />
                    <label class="block text-sm font-medium">
                      {{ language.arabic.name }}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                        <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25 11.0188 9.25 9.5C9.25 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M5.49994 19.0001L6.06034 18.0194C6.95055 16.4616 8.60727 15.5001 10.4016 15.5001H13.5983C15.3926 15.5001 17.0493 16.4616 17.9395 18.0194L18.4999 19.0001" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    </label>
                  </div> 

                  <div class="formInput">
                  
                    <input v-model="order.telephone" type="tel" class="w-full p-2 border rounded" required @blur="getCustomer"/>
                    <label class="block text-sm font-medium">
                      
                      {{ language.arabic.phone }}

                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                        <path d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                    </label>
                  </div>
                </div>
                
                
                <div class="formInput">
                  <select v-model="order.wilaya" @change="setWilaya(order.wilaya)">
                    <option disabled value="">إختر الولاية</option>
                    <option v-for="wilaya in wilayas" :key="wilaya.wilaya_id" :value="wilaya">
                      {{ wilaya.wilaya_name }}
                    </option>
                  </select>
                </div>
                
                <div class="center_el">
                    <button v-if="isHome" type="button" class="circle" @click="setDelivery(0)" :class="{ selected: deliveryIndex === 0 }" >
                      {{ language.arabic.homeDelevery }}
                    </button>
                    <button v-if="isDesk" type="button" class="circle" @click="setDelivery(1)" :class="{ selected: deliveryIndex === 1 }">
                      {{ language.arabic.deskDelevery }}
                    </button>
                  <label class="textLabel">
                    {{ language.arabic.deleveryMethode }}
                  </label>
                </div>

                <p v-if="prixFees">
                  {{ prixFees }} DA
                </p>

                <div v-if="municipalitys" class="formInput">
                  <select v-model="order.municipality" @change="setCommune(order.municipality)">
                    <option disabled value="">إختر البلدية</option>
                    <option v-for="(commune, index) in municipalitys" :key="index" :value="commune">
                      <p v-if="commune.nom">
                        {{ index + 1 }} {{ commune.nom }} 
                      </p>
                      <p v-else>
                        {{ index + 1 }} {{ commune.name }} 
                      </p>
                      
                      <p v-if="!commune.has_stop_desk">
                        لا يوجد توصيل للمكتب
                      </p>
                    </option>
                  </select>
                </div>

                <div v-else class="formInput">
                
                  <input v-model="order.municipality" type="text" class="w-full p-2 border rounded" @change="calculerPrix" required />
                  <label class="block text-sm font-medium">
                    {{ language.arabic.municipality }}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                        <path d="M14 22V8C14 5.17157 14 3.75736 13.1213 2.87868C12.2426 2 10.8284 2 8 2C5.17157 2 3.75736 2 2.87868 2.87868C2 3.75736 2 5.17157 2 8V16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 8 22H14Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M6.5 11H5.5M10.5 11H9.5M6.5 7H5.5M6.5 15H5.5M10.5 7H9.5M10.5 15H9.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M18.5 15H17.5M18.5 11H17.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M18 8H14V22H18C19.8856 22 20.8284 22 21.4142 21.4142C22 20.8284 22 19.8856 22 18V12C22 10.1144 22 9.17157 21.4142 8.58579C20.8284 8 19.8856 8 18 8Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                  </label>
                </div>
              
                <div class="formInput">
                  
                  <input v-model="order.adresse" class="w-full p-2 border rounded" required/>
                  <label class="block text-sm font-medium">
                    {{ language.arabic.adresse }}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                      <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="currentColor" stroke-width="1.5" />
                      <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="currentColor" stroke-width="1.5" />
                  </svg>
                  </label>
                </div>

                <div class="formInput">
                
                  <input v-model="order.note" type="text" class="w-full p-2 border rounded" />
                  <label class="block text-sm font-medium">
                    {{ language.arabic.note }}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                        <path d="M10.6119 5.00008L10.0851 7M12.2988 2.76313C12.713 3.49288 12.4672 4.42601 11.7499 4.84733C11.0326 5.26865 10.1153 5.01862 9.70118 4.28887C9.28703 3.55912 9.53281 2.62599 10.2501 2.20467C10.9674 1.78334 11.8847 2.03337 12.2988 2.76313Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M13 21.998C12.031 20.8176 10.5 18 8.5 18C7.20975 18.1059 6.53573 19.3611 5.84827 20.3287M5.84827 20.3287C5.45174 19.961 5.30251 19.4126 5.00406 18.3158L3.26022 11.9074C2.5584 9.32827 2.20749 8.0387 2.80316 7.02278C3.39882 6.00686 4.70843 5.66132 7.32766 4.97025L9.5 4.39708M5.84827 20.3287C6.2448 20.6965 6.80966 20.8103 7.9394 21.0379L12.0813 21.8725C12.9642 22.0504 12.9721 22.0502 13.8426 21.8205L16.6723 21.0739C19.2916 20.3828 20.6012 20.0373 21.1968 19.0214C21.7925 18.0055 21.4416 16.7159 20.7398 14.1368L19.0029 7.75375C18.301 5.17462 17.9501 3.88506 16.9184 3.29851C16.0196 2.78752 14.9098 2.98396 12.907 3.5" stroke="#141B34" stroke-width="1.5" />
                    </svg>
                  </label>
                </div>
              </div>
              
              <div v-if="prixTotal" class="formBox2">
                <div class="center_el" v-for="(sel, i) in selected" :key="i">
                  <div class="formInput3" style="width: 100%;">
                  
                    <h3 v-if="sel.promo && sel.promo != 0">
                      {{ sel.promo }} x {{sel.qty}} = {{ sel.promo * sel.qty }} DA
                    </h3>
                    <h3 v-else>
                      {{ sel.total }} x {{sel.qty}} = {{ sel.total * sel.qty }} DA
                    </h3>
                    <label style="font-size: 1.8vh">
                      : الكمية
                    </label>
                  </div>
                </div>
                

                <!--div class="formInput3">
                  
                  <h3>
                    {{ prixQty }} DA
                  </h3>
                  <label style="font-size: 1.8vh">
                    : سعر الكمية
                  </label>
                </div-->

                <div class="formInput3">
                  
                  <h3>
                    {{ prixFees }} DA
                  </h3>
                  <label style="font-size: 1.8vh">
                    : سعر التوصيل
                  </label>
                </div>

                
                <div class="formInput" style="margin-top: 20px;">
                
                  <input v-model="order.discount" @blur="testDiscount" type="text" class="w-full p-2 border rounded"/>
                  <label class="block text-sm font-medium">
                    {{ language.arabic.discount }}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="blue" fill="none">
                        <path d="M7.69171 19.6161C8.28274 19.6161 8.57825 19.6161 8.84747 19.716C8.88486 19.7298 8.92172 19.7451 8.95797 19.7617C9.21897 19.8815 9.42793 20.0904 9.84585 20.5083C10.8078 21.4702 11.2887 21.9512 11.8805 21.9955C11.96 22.0015 12.04 22.0015 12.1195 21.9955C12.7113 21.9512 13.1923 21.4702 14.1541 20.5083C14.5721 20.0904 14.781 19.8815 15.042 19.7617C15.0783 19.7451 15.1151 19.7298 15.1525 19.716C15.4218 19.6161 15.7173 19.6161 16.3083 19.6161H16.4173C17.9252 19.6161 18.6792 19.6161 19.1476 19.1476C19.6161 18.6792 19.6161 17.9252 19.6161 16.4173V16.3083C19.6161 15.7173 19.6161 15.4218 19.716 15.1525C19.7298 15.1151 19.7451 15.0783 19.7617 15.042C19.8815 14.781 20.0904 14.5721 20.5083 14.1541C21.4702 13.1923 21.9512 12.7113 21.9955 12.1195C22.0015 12.04 22.0015 11.96 21.9955 11.8805C21.9512 11.2887 21.4702 10.8078 20.5083 9.84585C20.0904 9.42793 19.8815 9.21897 19.7617 8.95797C19.7451 8.92172 19.7298 8.88486 19.716 8.84747C19.6161 8.57825 19.6161 8.28274 19.6161 7.69171V7.58269C19.6161 6.07479 19.6161 5.32083 19.1476 4.85239C18.6792 4.38394 17.9252 4.38394 16.4173 4.38394H16.3083C15.7173 4.38394 15.4218 4.38394 15.1525 4.28405C15.1151 4.27018 15.0783 4.25491 15.042 4.23828C14.781 4.11855 14.5721 3.90959 14.1541 3.49167C13.1923 2.52977 12.7113 2.04882 12.1195 2.00447C12.04 1.99851 11.96 1.99851 11.8805 2.00447C11.2887 2.04882 10.8078 2.52977 9.84585 3.49167C9.42793 3.90959 9.21897 4.11855 8.95797 4.23828C8.92172 4.25491 8.88486 4.27018 8.84747 4.28405C8.57825 4.38394 8.28274 4.38394 7.69171 4.38394H7.58269C6.07479 4.38394 5.32083 4.38394 4.85239 4.85239C4.38394 5.32083 4.38394 6.07479 4.38394 7.58269V7.69171C4.38394 8.28274 4.38394 8.57825 4.28405 8.84747C4.27018 8.88486 4.25491 8.92172 4.23828 8.95797C4.11855 9.21897 3.90959 9.42793 3.49167 9.84585C2.52977 10.8078 2.04882 11.2887 2.00447 11.8805C1.99851 11.96 1.99851 12.04 2.00447 12.1195C2.04882 12.7113 2.52977 13.1923 3.49167 14.1541C3.90959 14.5721 4.11855 14.781 4.23828 15.042C4.25491 15.0783 4.27018 15.1151 4.28405 15.1525C4.38394 15.4218 4.38394 15.7173 4.38394 16.3083V16.4173C4.38394 17.9252 4.38394 18.6792 4.85239 19.1476C5.32083 19.6161 6.07479 19.6161 7.58269 19.6161H7.69171Z" stroke="currentColor" stroke-width="2"></path>
                        <path d="M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15 15H14.9892M9.01076 9H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </label>
                  <div v-if="disLog && isSuccess === 1" class="alert-popup-container">
                    <div class="success-checkmark">
                      <div class="check-icon">
                        <span class="icon-line line-tip"></span>
                        <span class="icon-line line-long"></span>
                        <div class="icon-circle"></div>
                        <div class="icon-fix"></div>
                      </div>
                    </div>
                    <div class="alert-popup-title">{{ language.arabic.success }}</div>
                    <div class="alert-popup-message">
                      {{ disLog }}
                    </div>

                    <div v-if="discountV" class="formInputGoldDiscount">
                      - {{ discountV }}
                    </div>
                  </div>

                  

                  <div v-else-if="disLog && isSuccess === 0" class="alert-popup-container">
                    <div class="error-banmark">
                      <div class="ban-icon">
                        <span class="icon-line line-long-invert"></span>
                        <span class="icon-line line-long"></span>
                        <div class="icon-circle"></div>
                        <div class="icon-fix"></div>
                      </div>
                    </div>
                    <div class="alert-popup-title">{{ language.arabic.sorry }}</div>
                    <div class="alert-popup-message">
                      {{ disLog }}
                    </div>
                  </div>
                </div>

                <div class="formInput3">
                  
                  <h2>
                    {{ prixTotal }} DA
                  </h2>
                  <label style="font-size: 1.8vh">
                    : سعر الكلي
                  </label>
                </div>
              </div>

                    <!-- Le bouton normal (dans le formulaire) -->
              <div class="center_el">
                <button id="buyNow" type="submit" class="buyNow">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" color="#ffffff" fill="none">
                    <path d="M11.5 8H20.196C20.8208 8 21.1332 8 21.3619 8.10084C22.3736 8.5469 21.9213 9.67075 21.7511 10.4784C21.7205 10.6235 21.621 10.747 21.4816 10.8132C20.9446 11.068 20.6384 11.4914 20.4665 12M7.5 8H3.80397C3.17922 8 2.86684 8 2.63812 8.10084C1.6264 8.5469 2.07874 9.67075 2.24894 10.4784C2.27952 10.6235 2.37896 10.747 2.51841 10.8132C3.09673 11.0876 3.50177 11.6081 3.60807 12.2134L4.20066 15.5878C4.46138 17.0725 4.55052 19.1942 5.8516 20.2402C6.8062 21 8.18162 21 10.9325 21H11.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                    <path d="M14 19C14 19 15 19 16 21C16 21 19.1765 16 22 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.5 11L10 3M15 3L17.5 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
                </svg>
                <h2 style="font-weight: bold; color: white; font-size: 24px;">
                  {{ language.arabic.buyNow }}
                </h2>
                  

                  <!-- Sparkles harmonisés -->
                  <span class="sparkle" style="top: 15%; left: 20%; animation-delay: 0s;"></span>
                  <span class="sparkle" style="top: 35%; left: 60%; animation-delay: 0.4s;"></span>
                  <span class="sparkle" style="top: 25%; left: 75%; animation-delay: 0.8s;"></span>
                  <span class="sparkle" style="top: 55%; left: 30%; animation-delay: 1.2s;"></span>
                  <span class="sparkle" style="top: 70%; left: 50%; animation-delay: 1.6s;"></span>
                  <span class="sparkle" style="top: 80%; left: 15%; animation-delay: 2s;"></span>

                </button>
              </div>
              

              <!-- Bouton sticky visible quand l'original n’est plus visible -->
              <div
                v-if="isSticky"
                class="stickyBuyNow"
                @click="scrollToBuyNow"
              >
              انتقل إلى نموذج الشراء
                
              </div>
                    
              
            </form>
          </div>
        </div>
        
      </div>

      <form v-if="selected.length > 1 || colors.length > 1 || sizes.length > 1" @submit.prevent="submitOrder">
            
              
            
            
            
            

        <div ref="buyNowRef">
          <div class="center_el">
            
            <div class="formInput">
            
              <input v-model="order.nom" type="text" class="w-full p-2 border rounded" required />
              <label class="block text-sm font-medium">
                {{ language.arabic.name }}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                  <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" stroke-width="1.5" />
                  <path d="M14.75 9.5C14.75 11.0188 13.5188 12.25 12 12.25C10.4812 12.25 9.25 11.0188 9.25 9.5C9.25 7.98122 10.4812 6.75 12 6.75C13.5188 6.75 14.75 7.98122 14.75 9.5Z" stroke="currentColor" stroke-width="1.5" />
                  <path d="M5.49994 19.0001L6.06034 18.0194C6.95055 16.4616 8.60727 15.5001 10.4016 15.5001H13.5983C15.3926 15.5001 17.0493 16.4616 17.9395 18.0194L18.4999 19.0001" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              </label>
            </div> 

            <div class="formInput">
            
<<<<<<< HEAD
              <input 
                v-model="order.telephone" 
                type="tel" 
                inputmode="numeric" 
                maxlength="10"
                class="w-full p-2 border rounded" 
                required 
                @blur="getCustomer"
                @input="order.telephone = order.telephone.replace(/\D/g, '')"
              />

=======
              <input v-model="order.telephone" type="tel" class="w-full p-2 border rounded" required @blur="getCustomer"/>
>>>>>>> a2da8cf0bae37ce7b3e163b25a7a7826d312d900
              <label class="block text-sm font-medium">
                
                {{ language.arabic.phone }}

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                  <path d="M3.77762 11.9424C2.8296 10.2893 2.37185 8.93948 2.09584 7.57121C1.68762 5.54758 2.62181 3.57081 4.16938 2.30947C4.82345 1.77638 5.57323 1.95852 5.96 2.6524L6.83318 4.21891C7.52529 5.46057 7.87134 6.08139 7.8027 6.73959C7.73407 7.39779 7.26737 7.93386 6.33397 9.00601L3.77762 11.9424ZM3.77762 11.9424C5.69651 15.2883 8.70784 18.3013 12.0576 20.2224M12.0576 20.2224C13.7107 21.1704 15.0605 21.6282 16.4288 21.9042C18.4524 22.3124 20.4292 21.3782 21.6905 19.8306C22.2236 19.1766 22.0415 18.4268 21.3476 18.04L19.7811 17.1668C18.5394 16.4747 17.9186 16.1287 17.2604 16.1973C16.6022 16.2659 16.0661 16.7326 14.994 17.666L12.0576 20.2224Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
              </svg>
              </label>
            </div>
          </div>
          
          
          <div class="formInput">
            <select v-model="order.wilaya" @change="setWilaya(order.wilaya)">
              <option disabled value="">إختر الولاية</option>
              <option v-for="wilaya in wilayas" :key="wilaya.wilaya_id" :value="wilaya">
                {{ wilaya.wilaya_name }}
              </option>
            </select>
          </div>
          
          <div class="center_el">
              <button v-if="isHome" type="button" class="circle" @click="setDelivery(0)" :class="{ selected: deliveryIndex === 0 }" >
                {{ language.arabic.homeDelevery }}
              </button>
              <button v-if="isDesk" type="button" class="circle" @click="setDelivery(1)" :class="{ selected: deliveryIndex === 1 }">
                {{ language.arabic.deskDelevery }}
              </button>
            <label class="textLabel">
              {{ language.arabic.deleveryMethode }}
            </label>
          </div>

          <p v-if="prixFees">
            {{ prixFees }} DA
          </p>

          <div v-if="municipalitys" class="formInput">
            <select v-model="order.municipality" @change="setCommune(order.municipality)">
              <option disabled value="">إختر البلدية</option>
              <option v-for="(commune, index) in municipalitys" :key="index" :value="commune">
                <p v-if="commune.nom">
                  {{ index + 1 }} {{ commune.nom }} 
                </p>
                <p v-else>
                  {{ index + 1 }} {{ commune.name }} 
                </p>
                <p v-if="!commune.has_stop_desk">
                  لا يوجد توصيل للمكتب
                </p>
              </option>
            </select>
          </div>

          <div v-else class="formInput">
          
            <input v-model="order.municipality" type="text" class="w-full p-2 border rounded" @change="calculerPrix" required />
            <label class="block text-sm font-medium">
              {{ language.arabic.municipality }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                  <path d="M14 22V8C14 5.17157 14 3.75736 13.1213 2.87868C12.2426 2 10.8284 2 8 2C5.17157 2 3.75736 2 2.87868 2.87868C2 3.75736 2 5.17157 2 8V16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 8 22H14Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M6.5 11H5.5M10.5 11H9.5M6.5 7H5.5M6.5 15H5.5M10.5 7H9.5M10.5 15H9.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M18.5 15H17.5M18.5 11H17.5" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M18 8H14V22H18C19.8856 22 20.8284 22 21.4142 21.4142C22 20.8284 22 19.8856 22 18V12C22 10.1144 22 9.17157 21.4142 8.58579C20.8284 8 19.8856 8 18 8Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </label>
          </div>
        
          <div class="formInput">
            
            <input v-model="order.adresse" class="w-full p-2 border rounded" required/>
            <label class="block text-sm font-medium">
              {{ language.arabic.adresse }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                <path d="M13.6177 21.367C13.1841 21.773 12.6044 22 12.0011 22C11.3978 22 10.8182 21.773 10.3845 21.367C6.41302 17.626 1.09076 13.4469 3.68627 7.37966C5.08963 4.09916 8.45834 2 12.0011 2C15.5439 2 18.9126 4.09916 20.316 7.37966C22.9082 13.4393 17.599 17.6389 13.6177 21.367Z" stroke="currentColor" stroke-width="1.5" />
                <path d="M15.5 11C15.5 12.933 13.933 14.5 12 14.5C10.067 14.5 8.5 12.933 8.5 11C8.5 9.067 10.067 7.5 12 7.5C13.933 7.5 15.5 9.067 15.5 11Z" stroke="currentColor" stroke-width="1.5" />
            </svg>
            </label>
          </div>

          <div class="formInput">
          
            <input v-model="order.note" type="text" class="w-full p-2 border rounded" />
            <label class="block text-sm font-medium">
              {{ language.arabic.note }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#000000" fill="none">
                  <path d="M10.6119 5.00008L10.0851 7M12.2988 2.76313C12.713 3.49288 12.4672 4.42601 11.7499 4.84733C11.0326 5.26865 10.1153 5.01862 9.70118 4.28887C9.28703 3.55912 9.53281 2.62599 10.2501 2.20467C10.9674 1.78334 11.8847 2.03337 12.2988 2.76313Z" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" />
                  <path d="M13 21.998C12.031 20.8176 10.5 18 8.5 18C7.20975 18.1059 6.53573 19.3611 5.84827 20.3287M5.84827 20.3287C5.45174 19.961 5.30251 19.4126 5.00406 18.3158L3.26022 11.9074C2.5584 9.32827 2.20749 8.0387 2.80316 7.02278C3.39882 6.00686 4.70843 5.66132 7.32766 4.97025L9.5 4.39708M5.84827 20.3287C6.2448 20.6965 6.80966 20.8103 7.9394 21.0379L12.0813 21.8725C12.9642 22.0504 12.9721 22.0502 13.8426 21.8205L16.6723 21.0739C19.2916 20.3828 20.6012 20.0373 21.1968 19.0214C21.7925 18.0055 21.4416 16.7159 20.7398 14.1368L19.0029 7.75375C18.301 5.17462 17.9501 3.88506 16.9184 3.29851C16.0196 2.78752 14.9098 2.98396 12.907 3.5" stroke="#141B34" stroke-width="1.5" />
              </svg>
            </label>
          </div>
        </div>
        
        <div v-if="prixTotal" class="formBox2">
          <div class="center_el" v-for="(sel, i) in selected" :key="i">
            <div class="formInput3" style="width: 100%;">
            
              <h3 v-if="sel.promo && sel.promo != 0">
                {{ sel.promo }} x {{sel.qty}} = {{ sel.promo * sel.qty }} DA
              </h3>
              <h3 v-else>
                {{ sel.total }} x {{sel.qty}} = {{ sel.total * sel.qty }} DA
              </h3>
              <label style="font-size: 1.8vh">
                : الكمية
              </label>
            </div>
          </div>
          

          <!--div class="formInput3">
            
            <h3>
              {{ prixQty }} DA
            </h3>
            <label style="font-size: 1.8vh">
              : سعر الكمية
            </label>
          </div-->

          <div class="formInput3">
            
            <h3>
              {{ prixFees }} DA
            </h3>
            <label style="font-size: 1.8vh">
              : سعر التوصيل
            </label>
          </div>

          
          <div class="formInput" style="margin-top: 20px;">
          
            <input v-model="order.discount" @blur="testDiscount" type="text" class="w-full p-2 border rounded"/>
            <label class="block text-sm font-medium">
              {{ language.arabic.discount }}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="blue" fill="none">
                  <path d="M7.69171 19.6161C8.28274 19.6161 8.57825 19.6161 8.84747 19.716C8.88486 19.7298 8.92172 19.7451 8.95797 19.7617C9.21897 19.8815 9.42793 20.0904 9.84585 20.5083C10.8078 21.4702 11.2887 21.9512 11.8805 21.9955C11.96 22.0015 12.04 22.0015 12.1195 21.9955C12.7113 21.9512 13.1923 21.4702 14.1541 20.5083C14.5721 20.0904 14.781 19.8815 15.042 19.7617C15.0783 19.7451 15.1151 19.7298 15.1525 19.716C15.4218 19.6161 15.7173 19.6161 16.3083 19.6161H16.4173C17.9252 19.6161 18.6792 19.6161 19.1476 19.1476C19.6161 18.6792 19.6161 17.9252 19.6161 16.4173V16.3083C19.6161 15.7173 19.6161 15.4218 19.716 15.1525C19.7298 15.1151 19.7451 15.0783 19.7617 15.042C19.8815 14.781 20.0904 14.5721 20.5083 14.1541C21.4702 13.1923 21.9512 12.7113 21.9955 12.1195C22.0015 12.04 22.0015 11.96 21.9955 11.8805C21.9512 11.2887 21.4702 10.8078 20.5083 9.84585C20.0904 9.42793 19.8815 9.21897 19.7617 8.95797C19.7451 8.92172 19.7298 8.88486 19.716 8.84747C19.6161 8.57825 19.6161 8.28274 19.6161 7.69171V7.58269C19.6161 6.07479 19.6161 5.32083 19.1476 4.85239C18.6792 4.38394 17.9252 4.38394 16.4173 4.38394H16.3083C15.7173 4.38394 15.4218 4.38394 15.1525 4.28405C15.1151 4.27018 15.0783 4.25491 15.042 4.23828C14.781 4.11855 14.5721 3.90959 14.1541 3.49167C13.1923 2.52977 12.7113 2.04882 12.1195 2.00447C12.04 1.99851 11.96 1.99851 11.8805 2.00447C11.2887 2.04882 10.8078 2.52977 9.84585 3.49167C9.42793 3.90959 9.21897 4.11855 8.95797 4.23828C8.92172 4.25491 8.88486 4.27018 8.84747 4.28405C8.57825 4.38394 8.28274 4.38394 7.69171 4.38394H7.58269C6.07479 4.38394 5.32083 4.38394 4.85239 4.85239C4.38394 5.32083 4.38394 6.07479 4.38394 7.58269V7.69171C4.38394 8.28274 4.38394 8.57825 4.28405 8.84747C4.27018 8.88486 4.25491 8.92172 4.23828 8.95797C4.11855 9.21897 3.90959 9.42793 3.49167 9.84585C2.52977 10.8078 2.04882 11.2887 2.00447 11.8805C1.99851 11.96 1.99851 12.04 2.00447 12.1195C2.04882 12.7113 2.52977 13.1923 3.49167 14.1541C3.90959 14.5721 4.11855 14.781 4.23828 15.042C4.25491 15.0783 4.27018 15.1151 4.28405 15.1525C4.38394 15.4218 4.38394 15.7173 4.38394 16.3083V16.4173C4.38394 17.9252 4.38394 18.6792 4.85239 19.1476C5.32083 19.6161 6.07479 19.6161 7.58269 19.6161H7.69171Z" stroke="currentColor" stroke-width="2"></path>
                  <path d="M15 9L9 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M15 15H14.9892M9.01076 9H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </label>
            <div v-if="disLog && isSuccess === 1" class="alert-popup-container">
              <div class="success-checkmark">
                <div class="check-icon">
                  <span class="icon-line line-tip"></span>
                  <span class="icon-line line-long"></span>
                  <div class="icon-circle"></div>
                  <div class="icon-fix"></div>
                </div>
              </div>
              <div class="alert-popup-title">{{ language.arabic.success }}</div>
              <div class="alert-popup-message">
                {{ disLog }}
              </div>

              <div v-if="discountV" class="formInputGoldDiscount">
                - {{ discountV }}
              </div>
            </div>

            

            <div v-else-if="disLog && isSuccess === 0" class="alert-popup-container">
              <div class="error-banmark">
                <div class="ban-icon">
                  <span class="icon-line line-long-invert"></span>
                  <span class="icon-line line-long"></span>
                  <div class="icon-circle"></div>
                  <div class="icon-fix"></div>
                </div>
              </div>
              <div class="alert-popup-title">{{ language.arabic.sorry }}</div>
              <div class="alert-popup-message">
                {{ disLog }}
              </div>
            </div>
          </div>

          <div class="formInput3">
            
            <h2>
              {{ prixTotal }} DA
            </h2>
            <label style="font-size: 1.8vh">
              : سعر الكلي
            </label>
          </div>
        </div>

              <!-- Le bouton normal (dans le formulaire) -->
        <div class="center_el">
          <button id="buyNow" type="submit" class="buyNow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" color="#ffffff" fill="none">
              <path d="M11.5 8H20.196C20.8208 8 21.1332 8 21.3619 8.10084C22.3736 8.5469 21.9213 9.67075 21.7511 10.4784C21.7205 10.6235 21.621 10.747 21.4816 10.8132C20.9446 11.068 20.6384 11.4914 20.4665 12M7.5 8H3.80397C3.17922 8 2.86684 8 2.63812 8.10084C1.6264 8.5469 2.07874 9.67075 2.24894 10.4784C2.27952 10.6235 2.37896 10.747 2.51841 10.8132C3.09673 11.0876 3.50177 11.6081 3.60807 12.2134L4.20066 15.5878C4.46138 17.0725 4.55052 19.1942 5.8516 20.2402C6.8062 21 8.18162 21 10.9325 21H11.5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
              <path d="M14 19C14 19 15 19 16 21C16 21 19.1765 16 22 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6.5 11L10 3M15 3L17.5 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
          </svg>
          <h2 style="font-weight: bold; color: white; font-size: 24px;">
            {{ language.arabic.buyNow }}
          </h2>
            

            <!-- Sparkles harmonisés -->
            <span class="sparkle" style="top: 15%; left: 20%; animation-delay: 0s;"></span>
            <span class="sparkle" style="top: 35%; left: 60%; animation-delay: 0.4s;"></span>
            <span class="sparkle" style="top: 25%; left: 75%; animation-delay: 0.8s;"></span>
            <span class="sparkle" style="top: 55%; left: 30%; animation-delay: 1.2s;"></span>
            <span class="sparkle" style="top: 70%; left: 50%; animation-delay: 1.6s;"></span>
            <span class="sparkle" style="top: 80%; left: 15%; animation-delay: 2s;"></span>

          </button>
        </div>
        

        <!-- Bouton sticky visible quand l'original n’est plus visible -->
        <div
          v-if="isSticky"
          class="stickyBuyNow"
          @click="scrollToBuyNow"
        >
        انتقل إلى نموذج الشراء
          
        </div>
              
        
      </form>
      
      
      

      <div style="width: 100%; max-width: 800px; margin-block: 20px;" v-html="formattedDescription"></div>

    </div>

    <div v-if="!isUpdating && !found">
      <h1>{{ noProduct }}</h1>
    </div>

</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import lottie from 'lottie-web'
import useApi from '../composables/useApi.js'

// Routing
const route = useRoute()
const router = useRouter()
const { get, post } = useApi()

<<<<<<< HEAD
// API Composables
const { execute: getProducts, data: productsData, loading: productsLoading } = useApi('getProducts')
const { execute: getDeliveryMethod, loading: deliveryMethodLoading } = useApi('getDeliveryMethod')
const { execute: getCommuneApi, loading: communeLoading } = useApi('getCommune', { method: 'POST' })
const { execute: getAndersonCommune, loading: andersonCommuneLoading } = useApi('getAndersonCommune', { method: 'POST' })
const { execute: getYalidineCommune, loading: yalidineCommuneLoading } = useApi('getYalidineCommune', { method: 'POST' })
const { execute: getGuepexCommune, loading: guepexCommuneLoading } = useApi('getGuepexCommune', { method: 'POST' })
const { execute: getUpsFees, loading: upsFeesLoading } = useApi('getUpsFees')
const { execute: getAndersonFees, loading: andersonFeesLoading } = useApi('getAndersonFees')
const { execute: getYalidineFees, loading: yalidineFeesLoading } = useApi('getYalidineFees')
const { execute: getGuepexFees, loading: guepexFeesLoading } = useApi('getGuepexFees')
const { execute: getStoreDelivery, loading: storeDeliveryLoading } = useApi('getStoreDelivery')
const { execute: getCustomerApi, data: customerResult } = useApi('getCustomers', { method: 'POST' })
const { execute: testDiscountApi, data: discountResult, loading: discountLoading } = useApi('testDiscount', { method: 'POST' })
const { execute: postOrder, data: orderResult, loading: orderLoading } = useApi('postOrder', { method: 'POST' })
const { execute: productClick } = useApi('productClick', { method: 'POST' })
const { execute: viewPage } = useApi('viewPage', { method: 'POST' })
=======
>>>>>>> a2da8cf0bae37ce7b3e163b25a7a7826d312d900

// State
const isUpdating = ref(false)
const productList = ref([])
const municipalitys = ref([])
const selected = ref([])
const noProduct = ref('Aucun produit trouvé')
const found = ref(false)
const indexed = ref(-1)
const colors = ref([])
const sizes = ref([])

const isHome = ref(true)
const isDesk = ref(true)
const isSuccess = ref(0)

const productIndex = ref(0)
const catalogIndex = ref(0)
const colorIndex = ref(0)
const sizeIndex = ref(0)
const deliveryIndex = ref(0)
const discount = ref(0)
const discountV = ref(0)
const selectedQty = ref(0)

const selectedColor = ref(null)
const selectedSize = ref(null)

const buyNowRef = ref(null)
const isSticky = ref(false)
const waiting = ref(null)

const disLog = ref('')
//const deliveryList = ref([])
//const deliveryImage = ref()
const deliveryMethod = ref()

const wilIndex = ref()
const delIndex = ref()

<<<<<<< HEAD
const isUpdating = computed(() => {
  return productsLoading.value ||
    deliveryMethodLoading.value ||
    communeLoading.value ||
    andersonCommuneLoading.value ||
    yalidineCommuneLoading.value ||
    guepexCommuneLoading.value ||
    upsFeesLoading.value ||
    andersonFeesLoading.value ||
    yalidineFeesLoading.value ||
    guepexFeesLoading.value ||
    storeDeliveryLoading.value ||
    discountLoading.value ||
    orderLoading.value
})

=======
>>>>>>> a2da8cf0bae37ce7b3e163b25a7a7826d312d900
// Langues
const language = ref({
  french: {
    name: "Nom",
    phone: "téléphone",
    city: "Wilaya",
    municipality: "Commune",
    adresse: "Adresse",
    buyNow: "Acheter Maintenant",
    deleveryMethode: "Livraison",
    homeDelevery: "Maison",
    deskDelevery: "Bureau",
    qty: "quantité",
    note: "Note",
    discount: "Code Promo",
    sorry: "Désoler",
    success: "Bravo!!!",
  },
  arabic: {
    name: 'الإسم',
    phone: 'الهاتف',
    city: 'الولاية',
    municipality: 'البلدية',
    adresse: 'العنوان',
    buyNow: "أشتري الأن",
    deleveryMethode: ": التوصيل",
    homeDelevery: "للمنزل",
    deskDelevery: "للمكتب",
    qty: "الكمية",
    note: "ملاحظة",
    discount: "رمز ترويجي",
    sorry: "عفوا",
    success: "!!!مبروك",
  },
  english: {
    name: "Name",
    phone: "Phone",
    city: "City",
    municipality: "Municipality",
    adresse: "Address",
    buyNow: "Buy Now",
    deleveryMethode: "Shipping",
    homeDelevery: "Home",
    deskDelevery: "Desk",
    qty: "quantity",
    note: "Note",
    discount: "Promo Code",
    sorry: "Sorry",
    success: "Have Fun!!!",
  }
})



// Description formattée (HTML)
const formattedDescription = computed(() => {
  const currentProduct = productList.value[indexed.value]
  if (!currentProduct || !currentProduct.description) return ''
  const rawHtml = currentProduct.description
  return rawHtml.replace(/src="\/uploads/g, 'src="https://zoxcom.pietycloth.com/uploads')
})

const videoId = computed(() => {
  const url = productList.value[indexed.value].youtubeUrl || ''
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1)
    if (u.searchParams.has('v')) return u.searchParams.get('v')
  } catch {
    // si ce n'est pas une URL valide, on suppose que c'est déjà un ID
  }
  return url
})


function scrollToBuyNow() {
  buyNowRef.value?.scrollIntoView({ behavior: 'smooth' })
}

async function productClick() {
  try {

    const response = await fetch("https://zoxcom.pietycloth.com/backend/api.php?action=productClick", {
      method: "POST",
      body: JSON.stringify({ product_id: parseInt(route.params.id) })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }


    //const result = await response.json();

  } catch (error) {
    console.error('Une erreur est survenue:', error)
  }
}

async function viewPage() {
  try {

    const response = await fetch("https://zoxcom.pietycloth.com/backend/api.php?action=viewPage", {
      method: "POST",
      body: JSON.stringify({ product_id: parseInt(route.params.id) })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }


    //const result = await response.json();

  } catch (error) {
    console.error('Une erreur est survenue:', error)
  }
}


onMounted(async () => {

  lottie.loadAnimation({
    container: waiting.value,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/animation/waiting.json', // Chemin relatif ou absolu
  })

  await getProducts()
  await getDelivery()
  //getDeliveryFees()

  window.addEventListener('scroll', handleScroll)



  selectDetails(false, 0)
  selectedQty.value = 0

  viewPage()

  // ✅ Envoi événement visite
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: 'Homepage',
      content_category: 'Landing',
      value: 0,
      currency: 'DZD'
    });
  }

  // ✅ Envoi durée quand l’utilisateur quitte la page
  const startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const durationSeconds = Math.round((Date.now() - startTime) / 1000);
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'SessionDuration', {
        duration: durationSeconds,
        page: 'Homepage'
      });
    }
  });

})

function calcQty() {
  order.value.qty = 0
  for(var s of selected.value) {
    order.value.qty += s.qty
  }


}

function chosedDetails(index) {

  selectedQty.value = index


}

let isProcessing = false // pour éviter les appels récursifs accidentels

function selectDetails(isUpd, index) {
  if (isProcessing) return
  isProcessing = true

  try {
    const product = productList.value?.[indexed.value]
    if (!product) return

    const model = product.models?.[productIndex.value]
    if (!model) return

    const details = model.details || []
    let detailIndex = -1
    let image = ''
    let color_name = ''
    const newModal = model.modelName || ''
    var detailId
    var newSize

    // Si on a des détails, essayer de faire correspondre couleur + taille
    if (details.length > 0) {
      if (!selectedColor.value) setColor(0)
      if (!selectedSize.value) setSize(0)

      color_name = selectedColor.value?.color_name || ''

      for (let n = 0; n < details.length; n++) {
        const d = details[n]
        if (
          selectedColor.value?.color === d.color &&
          selectedSize.value?.size === d.size
        ) {
          image = d.catalog_image
          detailIndex = n
          detailId = parseInt(d.id)
          newSize = d.size
          break
        }
      }
    }

    const itemData = {
      modal_name: newModal,
      catalog_image: image,
      color: selectedColor.value?.color || '',
      colorName: color_name,
      size: newSize || '',
      id: detailIndex !== -1 ? detailIndex : '',
      total: model.sell,
      promo: model.promo,
      qty: 1,
      indx: detailId
    }

    if (index && typeof index === 'number') {
      selectedQty.value = index
    }

    if (detailIndex !== -1) {
      if (!isUpd && !selected.value.length) {
        selected.value.push(itemData)
      } else {


        if (isUpd) {


          const existing = selected.value[selectedQty.value]
          if (existing) {
            itemData.qty = existing.qty
            selected.value[selectedQty.value] = itemData
          }
        } else {
          selected.value.push(itemData)
        }
      }
    } else {
      // Aucun détail trouvé — suppression éventuelle
      if (!isUpd) {
        selected.value.push(itemData) // fallback minimal si aucun détail
      }
    }
    calcQty()

  } finally {
    isProcessing = false
  }
}



function handleScroll() {
  if (buyNowRef.value) {
    const rect = buyNowRef.value.getBoundingClientRect()
    const margin = 300 // plus la marge est grande, plus tôt le bouton disparaît

    // Affiche le bouton sticky uniquement si on est encore loin de la cible
    isSticky.value = rect.top > margin || rect.bottom < 0
  }
}




onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})


const order = ref({
  nom: '',
  telephone: '',
  wilaya: '',
  adresse: '',
  municipality: '',
  qty: 1,
  note: '',
  discount: ''
})

const deliveryFees = ref([])
const selectedFees = ref([])
const wilayas = ref([])
var selectedWilaya = ref()
var selectedMunicipality = ref()

var prixFees = ref()
var prixQty = ref()
var prixTotal = ref()


function setWilaya(wil) {
  if(wil.wilaya_name) {
    selectedWilaya.value = wil.wilaya_name
    if(deliveryMethod.value === 'custom') {
      for(var i = 0; i < deliveryFees.value.length; i++) {
        if (deliveryFees.value[i].wilaya_id === wil.wilaya_id) {

          selectedFees.value = deliveryFees.value[i]

          break
        }

      }
    }
    getCommune(wil)


  }

}

function setCommune(com) {


  if(com.nom) {
    selectedMunicipality.value = com.nom
  } else {
    selectedMunicipality.value = com.name
  }
  if(!com.has_stop_desk) {
    isDesk.value = false
  } else {
    isDesk.value = true
  }
  getDeliveryFees(com.wilaya_id)

  for(var index in deliveryFees.value) {
    if(deliveryFees.value[index].wilaya_id === com.wilaya_id) {
      selectedFees.value = deliveryFees.value[index]
      break
    }

  }

  calculerPrix();


}


function addQtySelect (i) {
  selected.value[i].qty++;
  calcQty()
}
async function removeQtySelect (i) {
  if(selected.value[i] && selected.value[i].qty > 1) {
    selected.value[i].qty--;
  } else if (i > 0) {


    await new Promise(resolve => setTimeout(resolve, 100)); // pause de 0.5s
    selectedQty.value = i - 1;
    selected.value.splice(i, 1);
  }

  calcQty()

}

function calculerPrix() {

  if(selectedWilaya.value) {

    if (deliveryIndex.value === 0 && selectedFees.value.tarif) {
      prixFees.value = parseFloat(selectedFees.value.tarif)
    } else if (deliveryIndex.value != 0 && selectedFees.value.tarif_stopdesk) {
      prixFees.value = parseFloat(selectedFees.value.tarif_stopdesk)
    } else if (deliveryIndex.value === 0 && selectedFees.value.express_home) {
      prixFees.value = parseFloat(selectedFees.value.express_home)
    } else if (deliveryIndex.value != 0 && selectedFees.value.express_desk) {
      prixFees.value = parseFloat(selectedFees.value.express_desk)
    }

    prixQty.value = 0
    for(var i of selected.value) {
      if(i.promo && i.promo != 0) {
        prixQty.value += i.promo * i.qty
      } else {
        prixQty.value += i.total * i.qty
      }

    }
    //prixQty.value = order.value.qty * productList.value[indexed.value].models[productIndex.value].sell
    prixTotal.value = prixQty.value + prixFees.value
  }


}

function setDelivery(i) {
  deliveryIndex.value = i

  setUpMethod(selectedWilaya.value)


  calculerPrix()
}


function submitOrder() {
  productClick()
  saveOrder()

  // Tu peux ensuite faire un fetch vers ton backend ici si tu veux enregistrer la commande
}

function clearSizeColor() {
  colors.value = []
  sizes.value = []
}

function setColor(index) {
  colorIndex.value = index
  selectedColor.value = colors.value[index]
  selectDetails(true, selectedQty.value)

}

function setSize(index) {
  sizeIndex.value = index
  selectedSize.value = sizes.value[index]
  selectDetails(true, selectedQty.value)
}


async function getDelivery() {
  await getStoreDelivery();

  const response = await get('getDeliveryMethod');
  if (response && response.success) {
    let myWilaya;
    const delivery = response.data.find(d => d.delivery_name === deliveryMethod.value);

    if (delivery) {
      myWilaya = JSON.parse(delivery.delivery_info);
    }

    if (myWilaya) {
      wilayas.value = [];
      deliveryFees.value = [];
      for (const w of myWilaya) {
        if (w.wilaya_active) {
          const wilaya_id = w.wilaya_id || w.id;
          const wilaya_name = w.wilaya_name || w.name;

          wilayas.value.push({
            wilaya_id: wilaya_id,
            wilaya_name: wilaya_name,
            desk_method: w.delivery_desk,
            home_method: w.delivery_home,
          });

          deliveryFees.value.push({
            wilaya_id: wilaya_id,
            tarif: w.home_price,
            tarif_stopdesk: w.desk_price,
            desk_active: w.desk_active,
            home_active: w.home_active,
          });
        }
      }
    }
  }
}

async function getCommune(wilaya) {
  if (wilaya.home_method === 'custom') {
    municipalitys.value = [];
    return;
  }
  selectedWilaya.value = wilaya;

  const communeActions = {
    ups: 'getCommune',
    anderson: 'getAndersonCommune',
    yalidine: 'getYalidineCommune',
    guepex: 'getGuepexCommune',
  };

  const action = communeActions[wilaya.home_method];
  if (!action) return;

  const result = await post(action, { wilaya_id: wilaya.wilaya_id });

  if (result) {
    const communes = result.data?.data || result;
    municipalitys.value = communes;

    if (communes && communes.length > 0) {
      setCommune(communes[0]);
    }
  }
}

function setUpMethod(id) {

  for(var index in deliveryFees.value) {
    if(deliveryFees.value[index].wilaya_id === id) {
      delIndex.value = index
      break
    }

  }
  for(var index2 in wilayas.value) {
    if(wilayas.value[index2].wilaya_id === id) {
      wilIndex.value = index2
      break
    }

  }

  if(wilayas.value[wilIndex.value].home_method && !deliveryIndex.value) {
    deliveryMethod.value = wilayas.value[wilIndex.value].home_method
  } else if(wilayas.value[wilIndex.value].desk_method && deliveryIndex.value) {
    deliveryMethod.value = wilayas.value[wilIndex.value].desk_method
  }

}

async function getDeliveryFees(id) {
  setUpMethod(id);

  const actionMap = {
    ups: { action: 'getUpsFees', type: 'wilaya' },
    anderson: { action: 'getAndersonFees', type: 'wilaya' },
    yalidine: { action: 'getYalidineFees', type: 'commune', params: { wilaya_id: selectedWilaya.value?.wilaya_id } },
    guepex: { action: 'getGuepexFees', type: 'commune', params: { wilaya_id: selectedWilaya.value?.wilaya_id } },
  };

  const methodInfo = actionMap[deliveryMethod.value];
  if (!methodInfo) return;

  const result = await get(methodInfo.action, methodInfo.params);
  if (!result || !result.success) return;

  const feeData = (methodInfo.type === 'wilaya') ? result.livraison : result.data.per_commune;

  if (feeData) {
    const currentFee = deliveryFees.value[delIndex.value];
    if (!currentFee) return;

    let fee;
    if (methodInfo.type === 'wilaya') {
      fee = feeData.find(f => f.wilaya_id === currentFee.wilaya_id);
    } else { // commune
      fee = feeData.find(f => f.commune_name === selectedMunicipality.value);
    }

    if (fee) {
      if (currentFee.desk_active && !currentFee.tarif_stopdesk) {
        currentFee.tarif_stopdesk = fee.tarif_stopdesk || fee.express_desk;
      }
      if (currentFee.home_active && !currentFee.tarif) {
        currentFee.tarif = fee.tarif || fee.express_home;
      }
    }
  }
}


function setCatalog(index) {
  catalogIndex.value = index
  productList.value[indexed.value].image = productList.value[indexed.value].catalog[index].image
}

function setModel(index) {

  productIndex.value = index

  indexed.value = productList.value.findIndex(item => item.id === route.params.id)

    found.value = indexed.value !== -1
    if(indexed.value !== -1) {
      clearSizeColor()
        for(var ii = 0; ii < productList.value[indexed.value].models[index].details.length; ii++) {
          if (colors.value) {
            const colorIndex = colors.value.findIndex(item => item.color === productList.value[indexed.value].models[index].details[ii].color)
            const sizeIndex = sizes.value.findIndex(item => item.size === productList.value[indexed.value].models[index].details[ii].size)
            if (colorIndex === -1) {
              colors.value.push({
                modelIndex: index,
                index: ii,
                color_name: productList.value[indexed.value].models[index].details[ii].colorName,
                color: productList.value[indexed.value].models[index].details[ii].color
              })
            }
            if (sizeIndex === -1) {
                sizes.value.push({
                modelIndex: index,
                index: ii,
                size: productList.value[indexed.value].models[index].details[ii].size
              })
            }
          }else {
            colors.value.push({
              modelIndex: index,
              index: ii,
              color_name: productList.value[indexed.value].models[index].details[ii].colorName,
              color: productList.value[indexed.value].models[index].details[ii].color

            })
            sizes.value.push({
              modelIndex: index,
              index: ii,
              size: productList.value[indexed.value].models[index].details[ii].size
            })
          }

      }

    }

    setColor(0)
    setSize(0)

    calculerPrix()
}

async function getProducts() {
  isUpdating.value = true
  try {
    const response = await fetch('https://zoxcom.pietycloth.com/backend/api.php?action=getProducts')

    if (!response.ok) {
      console.error('Erreur lors de la récupération des produits:', response.statusText)
      return
    }

    const result = await response.json()
    for(var i = 0; i < result.data.length; i++) {
      result.data[i].catalog = [{ image: result.data[i].image }, ...result.data[i].catalog];
    }
    productList.value = result.data

    setModel(productIndex.value)

    if(productList.value[indexed.value].youtubeUrl) {
      productList.value[indexed.value].catalog = [
        {image: 'https://img.freepik.com/vecteurs-premium/logo-rond-youtube-isole-fond-blanc_469489-983.jpg?semt=ais_hybrid&w=740'},
        ...productList.value[indexed.value].catalog
      ]


      setCatalog(0)
    }

  } catch (error) {
    console.error('Une erreur est survenue:', error)
  } finally {
    isUpdating.value = false
  }
}


async function saveOrder() {
  isUpdating.value = true;

  if (!selectedWilaya.value) {
    isUpdating.value = false;
    alert("يرجى اختيار الولاية")
    return
  }
  if (!order.value.nom) {
    isUpdating.value = false;
    alert("يرجى إدخال الاسم الكامل")
    return
  }
  if (!order.value.telephone) {
    isUpdating.value = false;
    alert("يرجى إدخال رقم الهاتف")
    return
  }
  if (!order.value.municipality) {
    isUpdating.value = false;
    alert("يرجى اختيار البلدية")
    return
  }


  //saveLog.value = 'Saving order, please wait...';
  /*if (!name.value || !phone.value || !qty.value || !country.value || !method.value.name) {
      saveLog.value = 'Please fill in all required fields.';
      return;
  }*/
  const model = productList.value[indexed.value].models[productIndex.value]
  const details = productList.value[indexed.value].models[productIndex.value].details


  if(model.aColor == 1) {
    if(!selectedColor.value) {
      if(details) {
        selectedColor.value = details[0].color
      } else {
        selectedColor.value = ''
      }

    }
  } else {
    selectedColor.value = ''
  }

  if(model.aSize == 1) {
    if(!selectedSize.value) {
      if(details) {
        selectedSize.value = details[0].size
      } else {
        selectedSize.value = ''
      }
    }
  } else {
    selectedSize.value = ''
  }



  const selectedModel = []
  for(var m of selected.value) {
    selectedModel.push({

      name: m.modal_name,
      image: m.catalog_image,
      qty: 1,
      price: parseFloat(m.total),
      ref: model.ref,
      indexD: productIndex.value,
      details: [model],
      total: parseFloat(m.total),
      idP: indexed.value,
      idM: m.indx ?? 0,
      selected: [{
        color: m.color,
        colorName: m.colorName,
        size: m.size,
        id: m.id,
        indx: m.indx ?? 0,
        total: m.total,
        promo: m.promo,
        qty: m.qty
      }]
    })
  }


  var zone1 = false
  var zone2 = false

  if(deliveryIndex.value === 0) {
    zone1 = true
    zone2 = false
  } else {
    zone1 = false
    zone2 = true
  }

  if (Array.isArray(selectedWilaya.value)) {
    order.value.wilaya = selectedWilaya.value[0]?.wilaya_name || ''
  } else if (typeof selectedWilaya.value === 'object' && selectedWilaya.value !== null) {
    order.value.wilaya = selectedWilaya.value.wilaya_name
  } else {
    order.value.wilaya = selectedWilaya.value
  }

  if (Array.isArray(selectedMunicipality.value)) {
    order.value.municipality = selectedMunicipality.value[0]?.nom || ''
  } else if (typeof selectedMunicipality.value === 'object' && selectedMunicipality.value !== null) {
    order.value.municipality = selectedMunicipality.value.nom
  } else {
    order.value.municipality = selectedMunicipality.value
  }


  const orderData = {
      data_time: Math.floor(Date.now() / 1000),
      name: order.value.nom,
      phone: order.value.telephone,
      qty: order.value.qty,
      country: 'algeria',
      method: deliveryMethod.value,
      select: order.value.wilaya,
      deliveryValue: `${prixFees.value} DA`,
      type: zone1 ? "0" : zone2 ? "1" : "",
      zone1: zone1,
      zone2: zone2,
      sZone: order.value.municipality,
      mZone: order.value.adresse,
      discount: order.value.discount,
      discountValue: discount.value,
      note: order.value.note,
      total: prixTotal.value,
      selectedProd: selectedModel,
  };
  //saveLog.value = 'Saving order, please wait for response...';
  try {
      const response = await fetch("https://zoxcom.pietycloth.com/backend/api.php?action=postOrder", {
          method: "POST",
          body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        isUpdating.value = false;
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json()



      if (result.success) {
        isUpdating.value = false;
        // ✅ Envoie l'événement d'achat à Facebook
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Purchase', {
          value: prixTotal.value,
          currency: 'DZD',
          contents: selectedModel.map(item => ({
            id: item.ref || item.idP || 'product-id',
            quantity: item.qty,
            item_price: item.price
          })),
          content_type: 'product'
        });
        }


        router.push(`/thenks/${result.data}`); // ← Redirection avec ID
      } else {
        isUpdating.value = false;
        alert("order not saved correctly")
      }
  } catch (error) {
    isUpdating.value = false;
    console.error('Error:', error);
    //saveLog.value = `Error: ${error.message}`;
  }

}

async function testDiscount() {

  if (order.value.discount) {
      const postBody = JSON.stringify({
          code: order.value.discount,
          time: Math.floor(Date.now() / 1000),
          phone: order.value.telephone
      });

      prixTotal.value = prixQty.value + parseFloat(prixFees.value);

      const response2 = await fetch('https://zoxcom.pietycloth.com/backend/api.php?action=testDiscount', {
      method: 'POST',
      body: postBody,
      });
      if(!response2.ok){
          disLog.value = "error in response";
          return;
      }
      const textResponse = await response2.json();  // Récupérer la réponse en texte
      if (textResponse.success) {
          var type = '';
          if(textResponse.message === '1' && prixQty.value) {
              if(textResponse.data.type === 0) {
                  type = '%';
                  discount.value = {value: parseFloat(textResponse.data.value), type: textResponse.data.type};
                  prixTotal.value -= (prixQty.value / 100) * parseFloat(discount.value.value);
              } else {
                  type = 'DA';
                  discount.value = {value: parseFloat(textResponse.data.value), type: textResponse.data.type};
                  prixTotal.value -= parseFloat(discount.value.value);
              }
              discountV.value = `${textResponse.data.value} ${type}`;
              disLog.value = `CODE : - ${textResponse.data.value} ${type}`;
              isSuccess.value = 1
          } else {
              if (textResponse.message === '1') {
                      if(textResponse.data.type === 0) {
                      type = '%';
                      discount.value = {value: parseFloat(textResponse.data.value), type: textResponse.data.type};
                      prixTotal.value -= (prixQty.value / 100) * parseFloat(discount.value.value);
                  } else {
                      type = 'DA';
                      discount.value = {value: parseFloat(textResponse.data.value), type: textResponse.data.type};
                      prixTotal.value -= parseFloat(discount.value.value);
                  }
                  discountV.value = `${textResponse.data.value} ${type}`;
                  disLog.value = `CODE : - ${textResponse.data.value} ${type}`;
                  isSuccess.value = 1
              } else if (textResponse.message === '2') {
                  disLog.value = 'لقد إنتهت مدة الصلحية';
                  isSuccess.value = 0
              } else if (textResponse.message === '3') {
                  disLog.value = 'لقد إستعملت الرمز بهاتفك';
                  isSuccess.value = 0
              } else if (textResponse.message === '4') {
                  disLog.value = 'لقد إنتهت صلحية الرمز';
                  isSuccess.value = 0
              } else if (textResponse.message === '5') {
                  disLog.value = 'رمز غير صالح';
                  isSuccess.value = 0
              } else if (textResponse.message === '6') {
                  disLog.value = 'رمز غير متوفر';
                  isSuccess.value = 0
              } else if (textResponse.message === '7') {
                  disLog.value = 'رقم الهاتف مهم';
                  isSuccess.value = 0
              } else if (textResponse.message === '8') {
                  disLog.value = 'معذرة لا يوجد رمز ترويجي';
                  isSuccess.value = 0
              }
          }


      } else {
          if (textResponse.message === '2') {
                  disLog.value = 'لقد إنتهت مدة الصلحية'
                  isSuccess.value = 0
              } else if (textResponse.message === '3') {
                  disLog.value = 'لقد إستعملت الرمز بهاتفك';
                  isSuccess.value = 0
              } else if (textResponse.message === '4') {
                  disLog.value = 'لقد إنتهت صلحية الرمز';
                  isSuccess.value = 0
              } else if (textResponse.message === '5') {
                  disLog.value = 'رمز غير صالح';
                  isSuccess.value = 0
              } else if (textResponse.message === '6') {
                  disLog.value = 'رمز غير متوفر';
                  isSuccess.value = 0
              } else if (textResponse.message === '7') {
                  disLog.value = 'رقم الهاتف مهم';
                  isSuccess.value = 0
              } else if (textResponse.message === '8') {
                  disLog.value = 'معذرة لا يوجد رمز ترويجي';
                  isSuccess.value = 0
              }

      }
  } else {
      //order.value.discount = 0;
      //updateTotal();
      disLog.value = 'لا يوجد أي رمز';
      isSuccess.value = 0
  }


}


const getStoreDelivery = async () => {
  const response = await get('getStoreDelivery');
  if (response && response.success) {
    const store = response.data.find(dev => dev.name === 'Clothing of Piety');
    if (store) {
      deliveryMethod.value = store.method;
    }
  }
}

const getCustomer = async () => {


  //isSaving.value = true

  const response = await fetch('https://zoxcom.pietycloth.com/backend/api.php?action=getCustomer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phone: `${order.value.telephone}` })
  });

  if (!response.ok) {
    console.error(response)
    return;
  }

  const textResponse = await response.json();

  if (textResponse.success) {
    const customer = textResponse.data[0]
    if(customer.name) {
      order.value.nom = customer.name

      order.value.adresse = customer.items[0].mZone
      await getDelivery()
      for (var wil of wilayas.value) {
        if (
          normalizeString(wil.wilaya_name) === normalizeString(customer.items[0].delivery_zone)
        ) {

          order.value.wilaya = wil
          setWilaya(order.value.wilaya)
          await getCommune(order.value.wilaya)
          for(var mun of municipalitys.value) {
            if(customer.items[0].sZone === mun.nom) {

              order.value.municipality = mun
              setCommune(mun)

            }
          }

          break // on arrête dès qu'on trouve
        }
      }



      calculerPrix()
    }


  }

}

function normalizeString(str) {
  return str
    .toString()
    .normalize("NFD")              // Sépare les accents
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .trim()                       // Enlève les espaces
    .toLowerCase()               // Minuscule
}



</script>

<style>

:root {
  --dark-color: #161616;
  --accent-color: #ff5151;
  --body-font: "Open Sans", sans-serif;
}

form {
  
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  max-width: 500px;
  margin-top: 20px;
  min-width: 300px;
  width: 90%;
  padding-inline: 10px;
  margin-inline: 10px;
}

.selector {
  width: 95%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  max-width: 500px;
  min-width: 300px;
  padding: 0px;
}

.price-display {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.old-price {
  min-width: 100px;
  max-width: 150px;
  font-size: 14px;
  color: #3f3939;
  text-decoration: line-through;
  margin: 0;
}

.promo-price {
  min-width: 100px;
  max-width: 150px;
  font-size: 16px;
  font-weight: bold;
  padding: 2px;
  border-radius: 12px;
  background-color: #ffc310;
  color: black; /* doré élégant */
  margin: 0;
  /*animation: blinkGold 1.5s infinite;*/
}

/* Animation de clignotement doré */
@keyframes blinkGold {
  0%, 100% {
    opacity: 1;
    text-shadow: 0 0 5px #f9d976, 0 0 10px #f9d976;
  }
  50% {
    opacity: 0.7;
    text-shadow: 0 0 2px #d4af37, 0 0 6px #d4af37;
  }
}

.title {
  background: rgb(255, 225, 179);
  border-radius: 8px;
  padding: 6px;
  font-weight: bold;
  font-size: 30px;
  color: #1e172d;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: IBM Plex Sans Arabic;
}

.qtyBtn {
  all: unset;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  color: white;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.qtyBtn svg {
  color: white;
}

.qtyBtn:hover {
  transform: scale(1.1);
  background: linear-gradient(135deg, #2563eb, #1e3a8a);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}

.qtyBtn:active {
  transform: scale(0.95);
}


.formInput {
  position: relative; 
  margin-block: 15px; 
  display: flex;
  flex-direction: column; 
  align-items: stretch;
  
}


.formInput label {
  min-width: 80px;
  position: absolute;
  top: -10px; 
  right: 12px;
  background: white; 
  border-radius: 10%;
  padding: 0 4px; 
  font-weight: bold;
  font-size: 14px;
  color: #1e172d;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-family: IBM Plex Sans Arabic;
}


.formInput input,
.formInput textarea {
  width: 100%;
  height: 30px;
  padding: 12px;
  padding-top: 20px; 
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  text-align: center;
  box-sizing: border-box;
  font-family: IBM Plex Sans Arabic;
}

.formInput select {
  width: 100%;
  min-height: 44px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  text-align: center;
  box-sizing: border-box;
  margin-top: 5px;
  font-family: "IBM Plex Sans Arabic", sans-serif;
}

.qty {
  width: 100%;
  height: 30px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  text-align: center;
  box-sizing: border-box;
  margin-top: 5px;
  font-family: IBM Plex Sans Arabic;
}

/* Pour Chrome, Safari, Edge */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Pour Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}


.formInput input:focus,
.formInput select:focus,
.formInput textarea:focus {
  border-color: #22c55e;
  outline: none;
}


.button {
  background-color: #22c55e;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #16a34a;
}

.list2 {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto; 
  scroll-snap-type: x mandatory; 
  gap: 10px; 
  padding: 10px;
  white-space: wrap;
  max-width: 500px; 
  width: 100%;
  box-sizing: border-box; 
  align-items: center;
  min-width: 0;
}

.list2::-webkit-scrollbar {
  height: 6px;
  background: white;
}

.list2::-webkit-scrollbar-thumb {
  background: orangered;
  border-radius: 4px;
}

.list2::-webkit-scrollbar-thumb:hover {
  background: orange;
}

.product-card {
  scroll-snap-align: start;
  flex: 0 0 auto;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: white;
  text-align: center;
  transition: transform 0.2s ease-in-out;
}

.product-card:hover {
  transform: scale(1.05); 
}




.model-button {
  width: 100px;
  height: 130px;
  border: none;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0,0,0,0.1);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.model-button.selected {
  border: 2px solid green;
}

.catalog-button {
  width: 100px;
  height: 130px;
  border: none;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 4px rgba(0,0,0,0.1);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.catalog-button.selected {
  border: 2px solid green;
}

.model-name {
  margin: 5px;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;         
  overflow: hidden;            
  text-overflow: ellipsis;     
  max-width: 100%;             
}

.model-price2 {
  width: fit-content;
  height: 30px;
  max-width: 95%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.model-price2 .promo {
  width: fit-content;
  max-width: 95%;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: #331000;
  text-align: center;
  background: linear-gradient(135deg, #fff8c6, #ffde59, #ffd700);
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
}


.scroll-wrapper {
  width: fit-content;
  height: 15px;
  max-width: 20%;
  min-width: 30px;
  padding: 5px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background: white;
  border-radius: 25px;
  gap: 5px;
}

.model-price2 .content {
  
  font-size: 12px;
  color: #331000;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding-left: 100%; /* commence hors-champ */
  animation: scroll-left linear 4s infinite;
  gap: 5px;
}


@keyframes scroll-left {
  0% {
    transform: translateX(25%);
  }
  100% {
    transform: translateX(-100%);
  }
}




.model-image {
  max-width: 80px;
  min-width: 80px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 4px;
}

.catalog-image {
  max-width: 50px;
  min-width: 50px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 4px;
}


.centerBoxing {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  color: var(--dark-color);
  min-width: 50px;
  height: 30px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid lightGray;
}
.centerBoxing.selected {
  border: 2px solid yellowgreen;
}

.colorBoxing {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  width: 30px;
  height: 30px;
  cursor: pointer;
  border: 2px solid lightgray;
  border-radius: 50px;
}
.colorBoxing.selected {
  border: 2px solid yellowgreen;
}

.miniBox {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  height: 30px;

}



.formInput3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  padding: 5px;
  height: 30px;
  background-color: #f1f1f1;
}

.formInput3 label {
  min-width: 100px;
}
.formInput3 h3 {
  min-width: 100px;
}

.formInputGoldDiscount {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  padding: 5px 10px;
  height: 30px;
  background: linear-gradient(to right, #fff8e1, #ffe082); /* effet doré */
  border: 1px solid #fbc02d;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(251, 192, 45, 0.6); /* légère lueur dorée */
  font-weight: bold;
  color: #795548; /* marron doux pour contraster */
}

.formInputGoldDiscount label {
  min-width: 100px;
  color: #6d4c41;
  font-weight: 600;
}

.formInputGoldDiscount h3 {
  min-width: 100px;
  color: #d32f2f; /* rouge doux pour évoquer une réduction */
  font-size: 1.1em;
}


.formBox {
  border: 2px solid #ff5800;
  border-radius: 10px;
  padding: 10px;
  margin-block: 20px;
}

.formBox2 {
  border-radius: 10px;
  padding: 10px;
  margin-block: 20px;
}

.buyNow {
  font-family: IBM Plex Sans Arabic;
  width: 90%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #ff9800;
  color: white;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  animation: pulseAnimation 2s infinite ease-in-out;
  margin-bottom: 10px;
}

.buyNow svg{
  margin-inline: 5px;
}

.buyNow::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ff5722;
  transform: scaleX(0); 
  transform-origin: right; 
  transition: transform 0.5s ease-in-out;
  z-index: -1; 
}

.buyNow:hover {
  background-color: #ff5722;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  animation: none;
}

.buyNow:hover::before {
  transform: scaleX(1);
}

.buyNow:active {
  transform: scale(0.98);
}

@keyframes pulseAnimation {
  0% {
    transform: scale(1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(255, 187, 0, 0.788);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

.buyNow .sparkle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #fff, #ffeb3b);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  animation: sparkleAnim 1.5s infinite ease-in-out;
}

@keyframes sparkleAnim {
  0% {
    transform: translate(0, 0) scale(0.5);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    transform: translate(-5px, -10px) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translate(5px, 10px) scale(0.2);
    opacity: 0;
  }
}

.circle {
  width: 50px;
  height: 50px;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  margin-inline: 5px;
  font-weight: bold;
}

.circle.selected {
  box-shadow: none;
  border: 2px solid green
}

.stickyBuyNow {
  position: fixed;
  bottom: 10px;
  width: calc(100% - 20px);
  height: 50px;
  left: 0;
  z-index: 9999;
  box-shadow: 0 4px 8px rgba(0,0,0,0.5);
  cursor: pointer;
  background-color: #339a46;
  color: white;
  font-weight: bold;
  text-align: center;
  transition: transform 0.3s ease, opacity 0.3s ease;
  margin-inline: 10px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stickyWaiting {
  position: fixed;
  bottom: calc(50% - 75px);
  width: 150px;
  height: 150px;
  left: calc(50% - 75px);
  z-index: 9999;
  transition: transform 0.3s ease, opacity 0.3s ease;
}


.product-image {
  width: 100%;
  max-width: 600px;
  min-width: 100px;
  max-height: 600px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
}

.flex-columns {
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: top;
  flex-wrap: wrap;
  gap: 5px; /* espace entre les colonnes */
}

.flex-columns > * {
  flex: 1 1 400px; /* minimum 300px, puis s'adapte */
  min-width: 0;
}


.center_el{
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.center_el3{
  width: 50%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.center_column{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 5px;
  border-radius: 8px;
  margin-block: 5px;
}
.center_column2{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  border: 1px solid lightgray;
  border-radius: 8px;
  background: transparent;
  margin-block: 5px;
}

.selected_el {
  background: #f0e7ff;
  

}

.add_btn_model {

  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: #812eff;
  cursor: pointer;
  padding: 5px;
  border-radius: 8px;
  margin-block: 5px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.textLabel {
  font-weight: bold;
  font-size: 14px;
  margin-inline: 10px;
}

.video-wrapper {
  width: 100%;
  height: 400px;
  max-width: 500px;
  min-width: 100px;
  max-height: 500px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  margin: 0 auto 1rem;
}
.youtube-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}



.alert-popup-container {
  text-align: center;
  margin-top: 10px;
}

.alert-popup-title {
  font-size: 30px;
  font-weight: bold;
  color: #4CAF50;
  margin-top: 15px;
  margin-bottom: 15px;
  z-index: 2;
  position: relative;
}

.alert-popup-message {
  color: #777;
  font-size: 21px;
  font-weight: 300;
  line-height: 1.4;
}

.alert-popup-confirm {
  margin-top: 20px;
  margin-bottom: 20px;
}

.success-checkmark {
  width: 80px;
  height: 80px;
  margin: 0 auto;

  .check-icon {
    width: 80px;
    height: 80px;
    position: relative;
    border-radius: 50%;
    box-sizing: content-box;
    border: 4px solid #4CAF50;

    &::before {
      top: 3px;
      left: -2px;
      width: 30px;
      transform-origin: 100% 50%;
      border-radius: 100px 0 0 100px;
    }

    &::after {
      top: 0;
      left: 30px;
      width: 60px;
      transform-origin: 0 50%;
      border-radius: 0 100px 100px 0;
      animation: rotate-circle 4.25s ease-in;
    }

    &::before,
    &::after {
      content: '';
      height: 100px;
      position: absolute;
      background: #FFFFFF;
      transform: rotate(-45deg);
      z-index: 2;
    }

    .icon-line {
      height: 5px;
      background-color: #4CAF50;
      display: block;
      border-radius: 2px;
      position: absolute;
      z-index: 10;

      &.line-tip {
        top: 46px;
        left: 14px;
        width: 25px;
        transform: rotate(45deg);
        animation: icon-line-tip 0.75s;
      }

      &.line-long {
        top: 38px;
        right: 8px;
        width: 47px;
        transform: rotate(-45deg);
        animation: icon-line-long 0.75s;
      }
    }

    .icon-circle {
      top: -4px;
      left: -4px;
      z-index: 10;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      box-sizing: content-box;
      border: 4px solid rgba(76, 175, 80, .5);
    }

    .icon-fix {
      top: 8px;
      width: 5px;
      left: 26px;
      z-index: 1;
      height: 85px;
      position: absolute;
      transform: rotate(-45deg);
      background-color: #FFFFFF;
    }
  }
}

@keyframes rotate-circle {
  0% {
    transform: rotate(-45deg);
  }

  5% {
    transform: rotate(-45deg);
  }

  12% {
    transform: rotate(-405deg);
  }

  100% {
    transform: rotate(-405deg);
  }
}

@keyframes icon-line-tip {
  0% {
    width: 0;
    left: 1px;
    top: 19px;
  }

  54% {
    width: 0;
    left: 1px;
    top: 19px;
  }

  70% {
    width: 50px;
    left: -8px;
    top: 37px;
  }

  84% {
    width: 17px;
    left: 21px;
    top: 48px;
  }

  100% {
    width: 25px;
    left: 14px;
    top: 45px;
  }
}

@keyframes icon-line-long {
  0% {
    width: 0;
    right: 46px;
    top: 54px;
  }

  65% {
    width: 0;
    right: 46px;
    top: 54px;
  }

  84% {
    width: 55px;
    right: 0px;
    top: 35px;
  }

  100% {
    width: 47px;
    right: 8px;
    top: 38px;
  }
}



.error-banmark {
  width: 80px;
  height: auto;
  margin: 0 auto;

  .ban-icon {
    width: 80px;
    height: 80px;
    position: relative;
    box-sizing: content-box;
    animation: rotate-circle1 0.5s;

    &::before {
      top: 3px;
      left: -2px;
      width: 30px;
      transform-origin: 100% 50%;
      border-radius: 100px 0 0 100px;
    }

    &::after {
      top: 0;
      left: 30px;
      width: 60px;
      transform-origin: 0 50%;
      border-radius: 0 100px 100px 0;
    }

    &::before,
    &::after {
      content: '';
      height: 100px;
      position: absolute;
      background: rgba(255, 255, 255, 0);
      transform: rotate(-45deg);
    }

    .icon-line {
      height: 5px;
      background-color: #d43f3a;
      display: block;
      border-radius: 2px;
      position: absolute;
      z-index: 10;

      &.line-long {
        top: 39px;
        left: 14px;
        width: 50px;
        transform: rotate(45deg);
        animation: icon-line-long1 1s;
      }

      &.line-long-invert {
        top: 39px;
        left: 14px;
        width: 50px;
        transform: rotate(-45deg);
        animation: icon-line-long-invert1 1s;
      }
    }

    .icon-circle {
      top: -4px;
      left: -4px;
      z-index: 10;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      box-sizing: content-box;
      border: 4px solid #d43f3a;
    }

    .icon-fix {
      top: 8px;
      width: 5px;
      left: 26px;
      z-index: 1;
      height: 85px;
      position: absolute;
      transform: rotate(-45deg);
      background-color: rgba(255, 255, 255, 0);
    }
  }
}


@keyframes rotate-circle1 {
  0% {
    transform: rotateX(100deg);
    opacity: 0;
  }

  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
}

@keyframes icon-line-long1 {
  0% {
    transform: scale(0.2) rotate(45deg);
    opacity: 0;
  }

  50% {
    transform: scale(0.6) rotate(45deg);
    opacity: 0;
  }

  80% {
    transform: scale(1.15) rotate(45deg);
  }

  100% {
    transform: scale(1) rotate(45deg);
    opacity: 1;
  }
}

@keyframes icon-line-long-invert1 {
  0% {
    transform: scale(0.2) rotate(-45deg);
    opacity: 0;
  }

  50% {
    transform: scale(0.6) rotate(-45deg);
    opacity: 0;
  }

  80% {
    transform: scale(1.15) rotate(-45deg);
  }

  100% {
    transform: scale(1) rotate(-45deg);
    opacity: 1;
  }
}





</style>