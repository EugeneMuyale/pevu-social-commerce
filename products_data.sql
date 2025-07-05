--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13 (Debian 15.13-1.pgdg120+1)
-- Dumped by pg_dump version 15.13 (Debian 15.13-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: pevu_user
--

INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (10, 'Phones and Tablets - MOBILE PHONES - Infinix', '2025-06-28 15:08:37.136608+00', true, true, 0, 40500, 0, 123, 'Infinix GT 20 Pro 5G, 6.78", 8GB RAM + 256GB, 5000mAh, Orange + Free Buds', '2025-06-28 15:11:15.426054+00', NULL, NULL, 0, 'The handset is 5G enabled and will feature a 6.78-inch AMOLED display with 1080 x 2436 pixels, and a 20:9 ratio (~388 ppi density) resolution. It will run on Android 14, and XOS 14 and is powered by an Octa-core Mediatek Dimensity 8200 Ultimate (4 nm) processor. The GT phone comes along with up to 256GB 12GB RAM UFS 3.1 internal memory, besides a dedicated MicroSD slot for additional memory. The main camera consists of a triple 108 MP + 2 MP + 2MP triple setup for pictures and video recording. A 32MP selfie lens, which records 1440p@30fps, 1080p@30/60fps videos is conveniently set up at the front end, housed within a button hole punch hole. To power the device, a 5,000mAh battery, is recharged by a 45W wired fast charger. Check at Phoneplace Kenya for updates and availability.  The available colorways for the Infinix GT 20 Pro 5G   are Mecha Blue, Mecha Orange, and Mecha Silver.

USPs

    Design: The phone features a customizable RGB LED back and a sleek design with IP54 dust and spla', 'Infinix GT 20 Pro 5G Features

    RAM: 8GB
    ROM: 256GB
    Network: 5G
    Dimensions: 3 x 75.4 x 8.2 mm (6.47 x 2.97 x 0.32 in)
    Weight: 194g
    Display: 78 inches, AMOLED
    Water resistance: IP54, Dust and Splash resistant
    OS: Android 14, XOS 14
    Chipset: Mediatek Dimensity 8200 Ultimate (4 nm)
    Main Camera: 108 MP + 2 MP + 2MP
    Selfie Camera: Single, 32MP
    Battery: 5,000mAh, 45W', 'Phones and Tablets', 'MOBILE PHONES', 'Infinix', 10, '{}', '{}', '{"attribute_1":"Orange"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (57, 'Health and Beauty - HAIR CARE', '2025-06-30 20:04:45.176497+00', true, true, 0, 500, 0, 123, 'Portable Rechargeable High Power Duo Ring Magnetic Blade Mini Shaver YR-188', '2025-06-30 20:04:45.176497+00', NULL, NULL, 0, 'Portable rechargeable High power Duo ring magnetic blade mini shaver YR-188 now available in 

*Available in 3 colours', 'Portable rechargeable High power Duo ring magnetic blade mini shaver YR-188 now available in 

*Available in 3 colours', 'Health and Beauty', 'HAIR CARE', '', 12, '{}', '{}', '{"attribute_1":"Grey"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (28, 'Phones and Tablets - MOBILE PHONES - Techno', '2025-06-28 20:51:00.517066+00', true, true, 0, 129900, 0, 123, 'Tecno Phantom V Fold 2 5G, 512GB ROM+12GB RAM+(12GB Extended RAM), 5750mAh With V Pen_ Rippling Blue (1YR WRTY)', '2025-06-28 20:51:00.517066+00', NULL, NULL, 0, 'TECNO Phantom V Flip  5G -  Experience the art of flipping into the future. Featuring 8GB RAM + 256GB storage, 64MP primary rear camera along with a 13MP wide-angle lens, 32MP front camera for selfies and video calls, 4000mAh battery and is powered by MediaTek''s Dimensity 8050 chipset.', '    Operating System: Android 14
    Processor: MTK D9000+
    Network: 2G, 3G,4G,5G
    Main Screen Dispaly：7.85'''' AMOLED
    Sub Screen Display: 6.42'''' AMOLED
    Main Screen Resolution: 2296 x 2000 2K+
    Sub Screen  Resolution: 2550 x 1080 FHD+
    Rear Camera: 50MP (Main) + 50MP(Portrait) + 50MP (Ultra-wide)
    Front Camera : 32MP + 32MP
    Memory :512GB ROM+ 12GB RAM（12GB extended RAM）
    Connectivity: WiFi 6E, BT 5.3
    Battery Capacity: 5750mAh (Typical) / 70W Ultra Charge /15W Fast Wireless Charge', 'Phones and Tablets', 'MOBILE PHONES', 'Techno', 10, '{}', '{}', '{"attribute_1":"Rippling Blue"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (54, 'Health and Beauty - HAIR CARE', '2025-06-30 19:56:31.436727+00', true, true, 0, 1500, 0, 123, 'Brazilian Curly Synthetic Headband Wig', '2025-06-30 19:56:31.436727+00', NULL, NULL, 0, 'Wig Material: synthetic fiber, it''s made of high-temperature wire, it feels and looks like real hair
Wig Type: Selected heat resistant synthetic fiber, looks real, nature, very pretty, which will bring you more confidence and more charm. Helps you have the perfect look for work environment, concerts, theme parties, weddings, dating, and any other occasion.
COLOR: the absolutely  color of the wig will match your color, make you more beautiful, just like healthy natural hair does.
Length: The size fit most People; you can adjust the hook inside the cap to the correct size to suit your head
Please Note: All wigs will shed slightly especially when you wear for the first time, which is normal. ', '    No Shedding
    Shimmering
    Maintain good gloss
    Long lasting and affordable 
    Contains full bundles for a full hair', 'Health and Beauty', 'HAIR CARE', '', 12, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (11, 'Phones and Tablets - MOBILE PHONES - Infinix', '2025-06-28 19:41:54.98024+00', true, true, 0, 12500, 0, 123, 'Infinix Hot 50i, 6.7", 128GB + 6GB RAM, 5000mAh (Dual SIM), Sleek Black (1YR WRTY)', '2025-06-28 19:41:54.980241+00', NULL, NULL, 0, 'Discover the Infinix Hot 50i, where cutting-edge technology meets stylish design! With a stunning 6.7” 120Hz Punch-Hole Display, every swipe and scroll feels fluid and responsive, bringing your content to life like never before. Whether you''re gaming, streaming, or browsing, enjoy vibrant colors and sharp clarity that captivate your senses. Capture stunning photos with the powerful 48MP rear camera, designed to elevate your photography skills. with the advanced XOS 14.5 powered by Android™ 14, experience a smooth and intuitive user interface that enhances your daily tasks and keeps you connected. Stay powered throughout your day with the robust 5000mAh battery. Embrace the future with this innovative device that combines exceptional performance, impressive camera capabilities, and a stunning display. Upgrade to the Infinix Hot 50i today and experience the difference!', '    MODEL: X6531
    DIMENSION: 165.7mm x 77.1mm x 8.1mm
    WEIGHT: 184g
    CHIPSET: MediaTek Helio G81
    CPU: Octa-core (2×2.0 GHz Cortex A75 &6×1.7 GHz Cortex-A55)
    GPU: G52 MC2 820MHz
    TECHNOLOGY: 2G / 3G / 4G
    BANDWIDTH: 
        2G：B2-3-5-8
        3G：B1-2-4-5-8
        4G：B1-2-3-4-5-7-8-12-13-17-20-25-26-28A-28B-38-41(Full) -40-66
    Rear: 48MP
    Front: 8MP
    APERTURE
        REAR: F/1.79
        FRONT: F/2.0
    FLASH
        REAR TWO FLASH+
        5M LED FLASH  +FRONT FLASH
    SCENE MODES: 
        SHORT VIDEO, VIDEO, AI CAM, BEAUTY,SUPER NIGHT, PORTRAIT, PANORAMA,SLOW MOTION, TIME-LAPSE,AR SHOT
     VIEDO RECORDING:
    1080P 30FPS/720P 30FPS 
    ROM: 128GB
    RAM: 6GB
    TYPE: LPDDR4X
    EXPANDABLE STORAGE: UP TO 2TB
    SIZE: 6.7-INCH
    SCREEN-TO-BODY RATIO: 90.2%
    RESOLUTION: 720*1600
    TYPE: IPS a-Si
    MATERIAL: LCD
    PEAK BRIGHTNESS: 500nits (TYP)
    REFRESH RATE: 60Hz/90Hz/120Hz
    TOUCH SAMPLING RATE: DP 60/TP 120, DP 90/TP 180, 



', 'Phones and Tablets', 'MOBILE PHONES', 'Infinix', 10, '{}', '{}', '{"attribute_1":"Sleek Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (12, 'Phones and Tablets - MOBILE PHONES - Infinix', '2025-06-28 19:46:54.456119+00', true, true, 0, 27500, 0, 123, 'Infinix Hot 50 Pro+, 6.78", 256GB + 8GB RAM (Dual Sim), 5000mAh, Sleek Black + Free XW3 Watch.', '2025-06-28 19:46:54.45612+00', NULL, NULL, 0, 'The Infinix Hot 50 Pro Plus features a 6.78-inch IPS LCD with a 60Hz/120Hz refresh rate, offering a screen resolution of 1080 x 2460 pixels (~396 ppi density). Powered by an Octa-core MediaTek Helio G100 (6nm) processor with a Mali-G57 GPU, it ensures a seamless gaming experience. The phone comes in Running on Android 14 and XOS 14.5, it also boasts a 5000mAh battery that supports 33W wired fast charging. The Infinix Hot 50 Pro Plus is equipped with a triple rear camera setup: 50MP + 2MP and a 13MP wide selfie camera. Get Infinix Hot 50 Pro Plus now!', 'MODEL: X6880
IMENSION: 164.10mm x 74.43mm x 6.8mm
WEIGHT: 162g
    CHIPSET: MediaTek Helio G100
    CPU: Octa-core (2×2.2 GHz Cortex A-76 & 6×2.0 GHz Cortex-A55) 
    GPU: Mail-G57
    PROCESS: 6nm
    TECHNOLOGY: 4G/ 3G/ 2G
    BANDWIDTH
        2G：B2-3-5-8
        3G：B1-2-4-5-8
        4G：B1-2-3-4-5-7-8-20-28A-28B-38-41(120M)-40
    Main: 50MP( Hi-5022Q,1/2.8'''' SENSOR,6P lens, F1.6, AF, FOV:77.3°)
    Depth: 2MP, F/2.4, FOV 89°, FF
    Front: 13MP (GC13A0, 1/3.06'''' Sensor,
    5P Lens, F2.2, FF, FOV:82°)
REAR DOUBLE FLASH+FRONT FLASH
SHORT VIDEO, VIDEO, AI CAM, SUPER NIGHT, PORTRAIT, SLOW MOTION, TIME-LAPSE, AR SHOT, DUAL VIDEO, SKY SHOP,PRO,FILM,PANORAMA
2K 30FPS/1080P 60FPS/ 1080P 30FPS/720P 30FPS
    256GB ROM 
    8GB RAM 
    ROM & RAM TYPE: UFS2.2, LPDDR4X
    EXPANDABLE STORAGE: UP TO 1TB
    SIZE: 6.78" 3D-Curved AMOLED
    SCREEN-TO-BODY RATIO: 93.80%
    RESOLUTION: FHD+ 1080*2436
    REFRESH RATE: 60Hz/120Hz
    TYPE: LTPS
    MATERIAL: AMOLED
    COVER GLASS: Corning®



', 'Phones and Tablets', 'MOBILE PHONES', 'Infinix', 15, '{}', '{}', '{"attribute_1":"Sleek Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (21, 'Phones and Tablets - MOBILE PHONES - Oppo', '2025-06-28 20:27:59.16976+00', true, true, 0, 35000, 0, 123, 'Oppo Reno 13 F 4G, 6.67", 8GB + 256GB, IP69, 5800mAh (Dual Sim) Graphite Grey', '2025-06-28 20:27:59.169761+00', NULL, NULL, 0, 'Size and Weight
    Height: 162.20mm
    Width: 75.05mm
    Thickness: 7.76mm 
    Weight: 192g
Storage
    RAM: 8GB 
    Storage: 256GB
    RAM Type:  LPDDR4X@2133MHz 2 × 16 bits
    ROM Specifications:  UFS 2.2
    Phone Storage Card: Supported
    USB OTG: Supported
Display
    Size: 6.67"
    Screen Ratio: 92.2%
    Resolution: 1080 x 2400 Pixels
    Refresh Rate: Maximum: 120Hz (60/120Hz)
Camera
Rear
    Wide angle: 50MP; f/1.8; FOV 76°; 5P lens; AF; EIS supported
    Ultra-wide angle: 8MP; f/2.2; FOV 112°; 5P lens; EIS supported
    Macro: 2MP; f/2.4; FOV 89°; 3P lens
Front
    32 MP, f/2.4, FOV 82°; 5P lens
Shooting Mode
    Rear: Photo, Video, Portrait, Night, PRO, Panorama, Macro, Slo-mo, Dual-view video, Time-lapse, sticker, HI-RES, Google lens, Underwater, Doc Scanner
    Front: Photo, Video, Portrait, Night, Panorama, Dual-view video, Time-lapse, sticker, Retouch, Screen fill light
Chips
    SoC: MediaTek Helio G100
    CPU: 8 cores
    GPU: ARM G57 MC2 1.0GHz', '    Battery: 5800mAh/22.74Wh
    Chips: SoC: MediaTek Helio G100
    RAM: 8GB 
    Storage: 256GB
    Size: 6.67"', 'Phones and Tablets', 'MOBILE PHONES', 'Oppo', 10, '{}', '{}', '{"attribute_1":"Graphite"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (22, 'Phones and Tablets - MOBILE PHONES - Samsung', '2025-06-28 20:31:13.050689+00', true, true, 0, 9340, 0, 123, 'Samsung Galaxy A05, 6.7'''' 4GB RAM + 64GB ROM (Dual Sim) 50MP Camera, 5000mAh - Black', '2025-06-28 20:31:13.05069+00', NULL, NULL, 0, 'Features and Specifications
Design
Available in Black, Silver and Light Green, Galaxy A05 comes in a sturdy frame with a linearly patterned backside. In addition, it is accompanied by Glass front, plastic back, plastic frame. In terms of SIM, it has Single SIM (Nano-SIM) or Dual SIM (Nano-SIM, dual stand-by).
Display
The screen keeps going. Enjoy your favorite games, movies and content with the vast, 6.7-inch HD+ display. Samsung Galaxy A05 has a PLS LCD display type. Moreover, the phone is equipped with 720 x 1600 pixels, 20:9 ratio (~262 ppi density) resolution for your HD videos and photos.
Performance
Equipped with a powerful octa-core, 6GB of memory and 128GB internal storage, Galaxy A05 offers efficient performance for the task at hand.. Besides, it runs on Android 13, One UI Core 4.1 which has the most attractive user interface. Having an 6GB RAM, the device has added support for virtual memory extension.
Here for when you need it. The 3.5mm earphone jack is a simple solut', '    6.7 inches IPS LCD display
    Mediatek MT6769V/CZ Helio G85 (12nm)
     4GB of RAM 64GB of internal storage
    5,000 mAh non-removable battery
    15W fast charging support
    4G LTE network support

 ', 'Phones and Tablets', 'MOBILE PHONES', 'Samsung', 15, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (13, 'Phones and Tablets - MOBILE PHONES - Infinix', '2025-06-28 19:52:11.016759+00', true, true, 0, 2700, 0, 123, 'nfinix Note 40 Pro, 6.78'''', 256GB + 8GB RAM (UPTO 16GB RAM), Dual SIM, 5000mAh, Black (1YR WRTY)', '2025-06-28 19:52:11.016759+00', NULL, NULL, 0, 'Infinix Note 40 Pro smartphone is powered by Helio G99 Ultimate 6nm Ultra Power Processor with Android 14. Immerse yourself in the stunning visuals delivered by the expansive 6.78-inch AMOLED display, offering an impressive 1080 x 2436 pixel resolution. Capture every moment with absolute clarity and precision using the advanced camera system of the Infinix Note 40 Pro. Its rear camera setup boasts a remarkable 108MP primary lens. Never let a low battery hold you back, thanks to the robust 5000mAh battery of the Infinix Note 40 Pro. Elevate your mobile experience with the Infinix Note 40 Pro and discover a world of endless possibilities.', 'Dual SIM
GSM / HSPA / LTE
OPERATING SYSTEM
Android 14, XOS 14
256GB + 8GB RAM
ype: AMOLED, 1B colors, 120Hz, 1300 nits (peak)
Size: 6.78 inches, 109.9 cm2 (~89.8% screen-to-body ratio)
Resolution: 1080 x 2436 pixels (~393 ppi density)
Protection: Corning Gorilla Glass
    108MP AF Super-Zoom Cam
    2 MP, f/2.4
    2 MP, f/2.4
32 MP, f/2.2, (wide), 1/3.1
    Loud speaker: Yes
    3.5mm jack: Yes
    Fingerprint (under display, optical)
    accelerometer
    gyro
    Dual Speaker with Sound by JBL
Type: 5000 mAh, non-removable
    70W All-Round FastCharge
    2.0 + 20W Wireless MagCharge
    Reverse wired
    Reverse wireless
    Display: 6.78 inches
    Memory: 256GB + 8GB RAM
    OS: Android 14, XOS 14
    Chipset: Mediatek Dimensity 7020 (6 nm)
    Main Camera: 108MP + 2MP + 2MP
    Selfie Camera: 32MP
    Battery: 5,000mAh

', 'Phones and Tablets', 'MOBILE PHONES', 'Infinix', 10, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (14, 'Phones and Tablets - MOBILE PHONES - Infinix', '2025-06-28 19:56:31.077729+00', true, true, 0, 35500, 0, 123, 'Infinix Note 50 Pro, 6.78", (8GB RAM, 256GB), Dual SIM, 5200mAh, Titanium Grey + FREE GIFT (2YRs WRTY)', '2025-06-28 19:56:31.07773+00', NULL, NULL, 0, 'The Infinix Note 50 Pro is a feature-rich smartphone that combines performance, display quality, and camera capabilities, making it a compelling choice in the midrange segment.', '    Dimensions: 163.3 x 74.4 x 7.3 mm
    Weight: 198 grams
    Build: Glass front, aerospace-grade aluminum frame
    Water/Dust Resistance: IP64 certified
    RGB Notification Light: Available on rear
    Type: 6.78-inch AMOLED, 1 billion colors
    Resolution: 1080 x 2436 pixels (~393 PPI)
    Refresh Rate: 144Hz
    Brightness: Up to 1300 nits peak
    Features: Always-On Display, 2160Hz PWM dimming, DCI-P3 color gamut
    Chipset: MediaTek Helio G100 Ultimate (6nm)
    CPU: Octa-core (2x2.2 GHz Cortex-A76 & 6x2.0 GHz Cortex-A55)
    GPU: Mali-G57 MC2
    RAM: 8GB LPDDR4X (expandable with 8GB virtual RAM)
    Storage: 256GB UFS 2.2
    OS: Android 15 with XOS 15
    Rear Cameras:
        50MP main (f/1.9, PDAF, OIS)
        8MP ultra-wide (112° field of view)
    Front Camera: 32MP (f/2.2)
    Video:
        Rear: 4K@30fps, 1080p@30/60/240fps
        Front: 4K@30fps
    Features: Dual-LED flash, HDR, panorama, flicker sensor
    Battery Capacity: 5200mAh
    Wired Charging: 90W f

', 'Phones and Tablets', 'MOBILE PHONES', 'Infinix', 10, '{}', '{}', '{"attribute_1":"Titanium Grey"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (15, 'Phones and Tablets - MOBILE PHONES - Infinix', '2025-06-28 20:03:22.607403+00', true, true, 0, 8600, 0, 123, 'Infinix Smart 8 6.6" HD, 2GB RAM + 64GB , Android 13 (Dual Sim) 5000mAh, White', '2025-06-28 20:03:22.607404+00', NULL, NULL, 0, 'Infinix Smart 8 64GB is in kenya. You get a smooth on-hand experience with the Infinix smartphone as it is powered by Octa core, 2 GHz, Cortex A53 MediaTek Helio P22 processor. This means, you will not face any interruptions while accessing multiple applications, playing intense graphics games and browsing the web.In addition to this, the mobile comes with a RAM capacity of 4 GB and 128 GB of internal storage capacity so that you can easily store images, videos, music, apps, and other files conveniently.

The Infinix Smart 8 64 GB  features fantastic rear and front cameras letting you click some amazing pictures. The rear setup comes with a 13 MP, Primary Camera, 5 MP, 2 MP. And, features on the rear setup of the phone include Digital Zoom, Auto Flash, Face detection, Touch to focus. Furthermore, you can click some amazing selfies and make video calls as the mobile sports a 12 MP on the front.

Hence, you get to enjoy watching videos, images and playing games with sharp and clear visua', '    Technology GSM / HSPA / LTE
    2G bands    GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2
    3G bands    HSDPA 850 / 900 / 2100
    HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100
    4G bands    1, 3, 5, 8, 38, 40, 41
    1, 2, 3, 4, 5, 7, 8, 20, 28, 38, 40, 41
    Speed    HSPA, LTE
    Dimensions    163.6 x 75.6 x 8.5 mm (6.44 x 2.98 x 0.33 in)
    Weight    184 g (6.49 oz)
    Build    Glass front, plastic back, plastic frame
    SIM    Dual SIM (Nano-SIM, dual stand-by)
    Type    IPS LCD, 90Hz, 500 nits (peak)
    Size    6.6 inches, 104.6 cm2 (~84.6% screen-to-body ratio)
    Resolution    720 x 1612 pixels, 20:9 ratio (~267 ppi density)
    Platform    OS    Android 13
    Chipset    Unisoc T606 (12 nm)
    CPU    Octa-core (2x1.6 GHz Cortex-A75 & 6x1.6 GHz Cortex-A55)
    GPU    Mali-G57 MP1
Card slot    microSDXC (dedicated slot)
Internal    64GB 2GB RAM
    Single    13 MP, f/1.9, 27mm (wide), AF
    0.08 MP, (auxiliary lens)
    Features    Ring-LED flash, HDR, panorama
   

', 'Phones and Tablets', 'MOBILE PHONES', 'Infinix', 10, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (19, 'Phones and Tablets - MOBILE PHONES - Oppo', '2025-06-28 20:20:25.684924+00', true, true, 0, 12000, 0, 123, 'Oppo A3X, 6.67", 64GB + 4GB RAM, 4G LTE, 45W Flash Charge (Dual SIM) 5,100 MAh- Ocean Blue', '2025-06-28 20:20:25.684925+00', NULL, NULL, 0, 'Oppo A3X 64GB 4GB RAM mobile was launched on 1st August 2024. The phone comes with a 120 Hz refresh rate 6.67-inch touchscreen display offering a resolution of 720 x 1604 pixels (HD+) at a pixel density of 264 pixels per inch (ppi). Oppo A3X 64GB 4GB RAM is powered by an octa-core MediaTek Dimensity 6300 processor. It comes with 4GB of RAM. The Oppo A3X 64GB 4GB RAM runs Android 14 and is powered by a 5100mAh non-removable battery. The Oppo A3X 128GB 4GB RAM supports 45W Fast Charging fast charging.

As far as the cameras are concerned, the Oppo A3X 64GB 4GB RAM on the rear packs an 8-megapixel camera with an f/2.0 aperture. It has a single front camera setup for selfies, featuring a 5-megapixel sensor with an f/2.2 aperture.

The Oppo A3X 64GB 4GB RAM runs ColorOS 14.0.1 is based on Android 14 and packs 256GB of inbuilt storage. The Oppo A3X 64GB 4GB RAM is a dual-SIM (GSM and GSM) mobile that accepts Nano-SIM and Nano-SIM cards. The Oppo A3X 64GB 4GB RAM measures 165.70 x 76.00 x 7.7', 'Size and Weight

    Height: about 165.77mm
    Width: about 76.08mm
    Thickness: about 7.68mm
    Weight: about 186g

Storage

    RAM 4GB + ROM 64GB
    RAM Type:  LPDDR4X@2133MHz, 2 × 16 bits
    ROM4Specifications: eMMC 5.1
    Phone Storage Card: Supported
    USB OTG: Supported

Display

    Size: 6.67"
    Screen Ratio: 89.9%
    Resolution: HD + (1604 × 720)
    Refresh Rate: Maximum: 90Hz
    Touch Sampling Rate: Maximum: 180Hz
    Default: 120Hz: Colour Gamut

Camera

    Rear: Main camera: 50MP; f/1.8; FOV 76°; 5P lens; AF; open-loop focus motor
    Front: 5MP; f/2.2, FOV 78°; 3P lens; FF

Shooting Mode

    Rear: Pro, Video, Photo, Night, Pano, Slo-mo, Time-lapse, Sticker, Text Scanner, Extra HD
    Front: Video, Photo, Portrait, Night, Pano, Time-lapse, Sticker, Extra HD

Video

Rear

 

    1080P@30fps, 720P@30fps
    Video zoom: 1080P@30fps, 720P@30fps
    Video slow motion: 720P@120fps
    Time-lapse mode: 1080P@30fps

Front

    Up to 1080/720P@30fps
    720P@30fps b', 'Phones and Tablets', 'MOBILE PHONES', 'Oppo', 10, '{}', '{}', '{"attribute_1":"Ocean Blue"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (16, 'Phones and Tablets - MOBILE PHONES - Infinix', '2025-06-28 20:05:35.798+00', true, true, 0, 7500, 0, 123, 'Infinix Smart 9 HD UpTo 6GBRAM+64GB ROM, 6.7 Inches, Battery: 5000 mAh, Network 4G, (Dual Sim)-Gold', '2025-06-28 20:05:35.798001+00', NULL, NULL, 0, 'Infinix Smart 9 HD 64GB mobile was launched on 13th December 2023. The phone comes with a 120 Hz refresh rate 6.6-inch touchscreen display offering a resolution of 720 x 1612 pixels (QHD+) at a pixel density of 276 pixels per inch (ppi). The display features Corning Gorilla Glass for protection. Infinix Smart 9 HD 64GB comes with 3GB of RAM and is powered by an Octa-Core Unisoc T606 (12 nm) processor. The Infinix Smart 9 HD 64GB runs Android 13, XOS 13 and is powered by a 5000mAh battery. The Infinix Smart 9 HD 64GB supports 10W Super VOOC fast charging.

As far as the cameras are concerned, the Infinix Smart 9 HD 64GB on the rear packs a dual camera setup featuring a 13-megapixel primary camera; and a 0.08-megapixel (auxiliary lens) camera. It has a single front camera setup for selfies, featuring a 8-megapixel sensor.

The Infinix Smart 9 HD 64GB runs Mali-G57 MP1 is based on Android 13 and packs 64GB of inbuilt storage. The Infinix Smart 9 HD 64GB is a dual-SIM mobile that accepts N', 'Brand	Infinix
Year Launched	2023
Model	X6525
Display
Display Size and Resolution	6.6 Inches, 720 x 1612 Pixels
Display Type	IPS LCD, 90Hz, 500 nits (peak)
Physical Design
Color	Crystal Green or Timber Black or Shiny Gold or Galaxy White
Sensors	Fingerprint (rear-mounted), accelerometer, proximity
SIM	Dual SIM (Nano-SIM, dual stand-by)
Performance
Processor	Octa-core (2x1.6 GHz Cortex-A75 & 6x1.6 GHz Cortex-A55)
Operating System	Android 13, XOS 13
Chipset	Unisoc T606 (12 nm)
GPU	Mali-G57 MP1
Storage
RAM	3GB
Internal Memory	64GB
Battery
Battery Capacity	Li-Po 5000 mAh, non-removable
Camera
Main Camera	13 MP f/1.8 + 0.08 MP
Front Camera	8 MP f/2.0
Ports
USB	USB Type-C 2.0, OTG
Specifications
Key Features

Screen: 6.6 inches, 720 x 1612 pixels
Storage: 64GB
RAM: 3GB
Battery: Li-Po 5000 mAh, non-removable
Specifications

    SKU: IN213MP3JIU3VNAFAMZ
    GTIN Barcode: 06009617770102
    Weight (kg): 0.2', 'Phones and Tablets', 'MOBILE PHONES', 'Infinix', 10, '{}', '{}', '{"attribute_1":"Gold"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (23, 'Phones and Tablets - MOBILE PHONES - Samsung', '2025-06-28 20:35:29.73062+00', true, true, 0, 16800, 0, 123, 'Samsung Galaxy A16, 6.7", 128GB + 4GB RAM (Dual SIM), 5000mAh, Black', '2025-06-28 20:35:29.730621+00', NULL, NULL, 0, 'Samsung Galaxy A16   The manufacturer, Samsung, officially announced the 5G network-enabled handset on October 7th, 2024, and it became available from October 25th. It is available in 3 choice colorways: Blue Black, Light Gray, Gold, and Light Green. It measures 164.4 x 77.9 x 7.9 mm (6.47 x 3.07 x 0.31 in) and weighs 200g, thus lightweight and slim, as characteristic of most mid-priced Samsung handsets.

Galaxy A16 features a large, immersive 6.7-inch Super AMOLED display that boasts of 90Hz refresh rate and 1080 x 2340 pixels. These display specs make it a great device for gaming and a movie-watching experience for a phone within its price range. Running on Android 14, it is future-proof considering it offers up to 6 major Android upgrades. Samsung’s One UI 6.1 provides perfect user-friendly UI for enjoyable moments every time you power on the device. Powered by an Octa-core Exynos 1330 (5 nm) or Mediatek Dimensity 6300 (6 nm) processor and anchored by 128GB 4GB RAM, 128GB 6GB RAM, a', 'Brand	Samsung
Model name
    Galaxy A16 4G
    SM-A165F, SM-A165F/DS, SM-A165M, SM-A165M/DS
Dimensions	
    Dimensions: 164.4 x 77.9 x 7.9 mm (6.47 x 3.07 x 0.31 in)
    Weight: 200 g (7.05 oz)
    Build: Glass front, plastic back, plastic frame
    SIM: Single SIM (Nano-SIM) or Hybrid Dual SIM (Nano-SIM, dual stand-by)
    Waterproof: IP54, dust, and splash resistant
Display	
    Type: Super AMOLED, 90Hz
    Size: 6.7 inches, 110.2 cm2 (~86.0% screen-to-body ratio)
    Resolution: 1080 x 2340 pixels, 19.5:9 ratio (~385 ppi density)
Camera set up
Front Camera
    13 MP, f/2.0, (wide)
    Video      1080p@30fps

Main Camera

    50 MP, f/1.8, (wide), AF
    5 MP, f/2.2, (ultrawide)
    2 MP, f/2.4, (macro)
    Features: LED flash, panorama, HDR
    Video: 1080p@30fps
Audio Support
    Stereo loudspeaker: yes
    3.5mm port: not supported
Storage Specs
    Internal Storage: 128GB 4GB RAM
    Memory Card: microSDXC (uses shared SIM slot)
', 'Phones and Tablets', 'MOBILE PHONES', 'Samsung', 10, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (17, 'Phones and Tablets - MOBILE PHONES - Infinix', '2025-06-28 20:10:42.928917+00', true, true, 0, 85000, 0, 123, 'Share this product Official Store Anniversary deal Infinix ZERO FLIP, 512GB + 8GB RAM (Dual SIM), 4720mAh, Rock Black (1YR WRTY)', '2025-06-28 20:10:42.928917+00', NULL, NULL, 0, 'The Infinix Zero Flip is a foldable smartphone featuring a 6.9-inch FHD+ LTPO AMOLED display with a 120Hz refresh rate and a 3.64-inch cover AMOLED display, also at 120Hz. Powered by the MediaTek Dimensity 8020 chipset, it includes 8GB RAM, extendable with an additional 8GB of virtual RAM, and offers up to 512GB storage. The camera setup includes a 50MP main sensor with optical image stabilization, a 50MP ultra-wide lens, and a 50MP front camera. It houses a 4720mAh battery supporting 70W fast charging​.', 'DIMENTION
    Unfolded: 170.75*73.4*7.64mm
    Folded: 87.97*73.4*16.04mm
    WEIGHT: 195g
PLATFORM
    CHIPSET: MTK D8020(6 nm)
    CPU: Octa-core(4×A78 2.6GHz+4×A55 2.0GHz)
    GPU: Arm Mali-G77 MC9
NETWORK
    TECHNOLOGY: 5G/4G/3G/2G
    BANDWIDTH: 
        2G : B2,3,5,8
        3G : 1, 2, 4, 5, 8
        4G : FDD: 1,2,3,4,5,7,8,12,13,17,20,28,66
        TDD: 34,38,39,40,41,42
        5G : sub6 TDD: n38/n40/n41/n77/n78
        sub6 FDD: n1/n3/n5/n7/n8/n12/n20/n28/n66
CAMERA
    REAR CAMERA: 50MP 1.0um（GN5，1.0um，FOV 84°，OIS，PDAF) + 50MP（Hi-5022Q，0.64um，FOV 114.5°，PDAF）
    FRONT CAMERA: 50MP AF（JN1，0.64um，FOV 82.3°，PDAF）
    APERTURE
        REAR CAMERA: F1.88; F2.2
        FRONT CAMERA: F2.45
    FLASH
        FRONT DOUL FLASH          
        REAR DUAL FLASH
    SCENE MODES: VLOG,VIDEO,PHOTO,SUPER NIGHT,PORTRAIT, SLOW MOTION, TIME-LAPSE, AR SHOT, DOCUMENTS, SUPER MACRO, PANORAMA, SKY SHOP,PRO,DUAL VIDEO,LONG EXPOSURE,WIDE SELFIE ', 'Phones and Tablets', 'MOBILE PHONES', 'Infinix', 10, '{}', '{}', '{"attribute_1":"Rock Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (18, 'Phones and Tablets - MOBILE PHONES - Oppo', '2025-06-28 20:14:19.580962+00', true, true, 0, 8000, 0, 123, 'Oppo A16k, 6.52", 32GB + 3GB RAM , 4230mAh, (Single SIM) Blue', '2025-06-28 20:14:19.580962+00', NULL, NULL, 0, '​OPPO A16K smartphone and Enjoy a 13-megapixel main camera and a 5-megapixel selfie camera. It also packs a 4,230mAh battery. OPPO A16K features a waterdrop-style notch display and is powered by a Mediatek Helio G35 processor.  The handset features a 6.52-inch HD+,  3GB of LPDDR4X RAM, 32GB storage, 13-megapixel rear camera and a 5-megapixel selfie camera. Order for this OPPO A16k online from Jumia Kenya and have it delivered to your doorstep.', '
Display


    Size: 6.52"(16.55cm)
    Screen Ratio: 89.27%
    Resolution: 1600 x 720 (HD+)
    Refresh Rate: 60 Hz
    Touch Sampling Rate: 60 Hz
    Colour Gamut: Typical value 71% NTSC
    Pixel Density: 269PPI
    Contrast Ratio: 1500:1 (Typical)
    Brightness: 480 nits (Typical)
    Panel: LCD
    Cover Glass: Corning glass 3 (GG3)



Memory


    3GB + 32GB
    RAM Type: LPDDR4X @ 1600 MHz 2 x 16 bits
    ROM Type: eMMC 5.1
    External Memory: MicroSD card (Max storage: 1TB)
    USB Version: USB 2.0
    USB OTG: Supported



Camera


    Rear
        Main camera: 13MP: f/2.2; FOV 80°; 5P lens; AF supported

    Front
        5MP: f/2.4, FOV: 76°, 3P lens



Shooting Mode


    Rear:
        Photo, Video, Night, Expert, Panoramic, Time-lapse

    Front:
        Photo (Retouching turned on by default), Video, Panoramic, Time-lapse



Image Size


    Rear:
        Maximum size: 4160 x 3120 (13MP)
        Photo mode with different aspect ratios:
        4160 x 3120 (4:3)
       ', 'Phones and Tablets', 'MOBILE PHONES', 'Oppo', 10, '{}', '{}', '{"attribute_1":"Blue"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (20, 'Phones and Tablets - MOBILE PHONES - Oppo', '2025-06-28 20:23:57.129167+00', true, true, 0, 27575, 0, 123, 'Oppo A5 Pro,6.67",8GB RAM+256GB ROM,IP69,45W+5800mAh (Dual Sim) Olive Green', '2025-06-28 20:23:57.129167+00', NULL, NULL, 0, 'Network	Technology	GSM / HSPA / LTE / 5G
2G bands	GSM 850 / 900 / 1800 / 1900
3G bands	HSDPA 800 / 850 / 900 / 1700(AWS) / 1900 / 2100 - Global
 	HSDPA 850 / 2100 - Indonesia
4G bands	1, 2, 3, 4, 5, 7, 8, 12, 13, 17, 18, 19, 20, 26, 28, 38, 39, 40, 41, 66 - Global
 	1, 3, 5, 8, 40 - Indonesia
5G bands	1, 2, 3, 5, 7, 8, 20, 28, 38, 40, 41, 66, 77, 78 SA/NSA - Global
 	1, 3, 5, 8, 40 SA/NSA - Indonesia
Speed	HSPA, LTE (CA), 5G
', 'Technical Specifications
Storage
 

    RAM: 8GB
    ROM:256GB
    RAM Type:LPDDR4X
    ROM Specifications:UFS 2.1
    Phone Storage Card:Supported
    USB OTG:Supported

 

Display

    Size: 6.67"
    Screen Ratio:89.9%
    Resolution:720 x 1604 Pixels
    Refresh Rate:Maximum: 90Hz (60/90Hz)
    Touch Sampling Rate:Maximum: 90Hz,Default: 60Hz
    Colour Gamut: Vivid mode: 84% DCI-P3,Natural mode: 98% sRGB
    Colour Depth:16.7 million colours (8-bit)
    Pixel Density: 264 PPI
    Brightness:Maximum brightness under sunlight: 1000nits (Typical)
    Panel:LCD
    Cover Glasses: AGC DT-Star D+, Corning® Gorilla® Glass 7i

Camera
Rear

    Wide angle: 50 MP; f/1.8; FOV 76°; 5P lens; AF supported
    Monochrome: 2 MP; f/2.4; FOV 89°; 3P lens

Front

    8 MP, f/2.0, FOV 80°; 4P lens

Shooting Mode
 

    Rear: Photo, Video, Portrait, Night, PRO, Panorama, Slo-mo, Dual-view video, Time-lapse, Sticker, Hypertext, HI-RES, Google Lens
    Front: Photo, Video, Portrait, Night, Dual-view vide', 'Phones and Tablets', 'MOBILE PHONES', 'Oppo', 10, '{}', '{}', '{}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (24, 'Phones and Tablets - MOBILE PHONES - Samsung', '2025-06-28 20:38:39.96776+00', true, true, 0, 49900, 0, 123, 'Samsung Galaxy A56 5G, 6.7", 256GB + 8GB RAM (Dual SIM), 5000mAh, Awesome Graphite', '2025-06-28 20:38:39.967761+00', NULL, NULL, 0, 'Discover the Samsung Galaxy A56 5G, designed for high-speed 5G connectivity, a large display, and powerful performance. Equipped with a long-lasting battery and an advanced camera system, it ensures an exceptional user experience for everyday tasks and entertainment. Galaxy A56 5G provides a robust set of features, making it a compelling choice for users seeking a balance between performance and affordability.
 ', 'Specifications:

    Display: 6.7-inch Super AMOLED with a resolution of 1080 x 2340 pixels, providing vibrant and sharp visuals.
    Processor: Samsung Exynos 1580 (4 nm), Octa-core (1x2.9 GHz Cortex-A720, 3x2.6 GHz Cortex-A720, 4x1.95 GHz Cortex-A520), ensuring smooth performance across applications.
    Rear Camera:
        Main Camera: 50MP with Optical Image Stabilization (OIS) and Phase Detection Autofocus (PDAF) for clear and stable shots.
        Ultra-Wide Camera: 12MP for capturing expansive scenes.
        Macro Camera: 5MP for detailed close-up photography.
    Front Camera: 12MP, suitable for high-quality selfies and video calls.
    RAM and Storage: 8GB RAM, with internal storage options of 256GB. 
    Battery: 5000mAh capacity supporting 45W fast charging, ensuring extended usage with quick recharge times.
    Operating System: Android 15 with One UI 7, with a commitment to up to six major Android upgrades, ensuring long-term software support.
    Build and Dimensions: M', 'Phones and Tablets', 'MOBILE PHONES', 'Samsung', 10, '{}', '{}', '{"attribute_1":"Awesome Graphite"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (25, 'Phones and Tablets - MOBILE PHONES - Techno', '2025-06-28 20:43:01.482655+00', true, true, 0, 29900, 0, 123, 'Tecno Camon 30, 6.78", 256GB + 8GB RAM (+8GB Extended), Dual SIM, 5000mAh, 4G, Iceland Basaltic Dark (1YR WRTY)', '2025-06-28 20:43:01.482656+00', NULL, NULL, 0, 'The Tecno Camon 30 is a mid-range smartphone that was launched in February 2024 as part of the Camon 30 series. It offers a 6.78-inch FHD+ AMOLED display, a 50 MP quad camera system, a 50 MP selfie camera, and a 5,000mAh battery with 70W fast charging. 
Display and DesignThe Tecno Camon 30 features a 6.78-inch FHD+ AMOLED display with a resolution of 1080 x 2436 pixels and a refresh rate of 120Hz. The display is bright and vivid, with a fingerprint scanner embedded under the screen. The device has a sleek and stylish design, with a gradient back panel that comes in Black, Blue, and Orange color options. The device measures 165.3 x 75.3 x 7.7 mm and weighs around 200 grams.
Performance and StorageThe Tecno Camon 30 is powered by the Mediatek Helio G99 Ultimate processor, which is an octa-core chipset with two Cortex-A76 cores clocked at 2.2 GHz and six Cortex-A55 cores clocked at 2.0 GHz. The processor is paired with a Mali-G57 MC2 GPU for graphics performance. The device runs on Androi', 'Network
    Technology  GSM / HSPA / LTE
    2G bands    GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2
    3G bands    HSDPA 850 / 900 / 1700(AWS) / 1900 / 2100
    4G bands    LTE (unspecified)
    Speed    HSPA, LTE
Body 

    Dimensions    165.3 x 75.3 x 7.7 mm (6.51 x 2.96 x 0.30 in)
    Weight    -
    Build    Glass front, glass back or silicone polymer back (eco leather)
    SIM    Dual SIM (Nano-SIM, dual stand-by)
Display 
    Type    AMOLED, 120Hz
    Size    6.78 inches, 109.9 cm2 (~88.3% screen-to-body ratio)
    Resolution    1080 x 2436 pixels (~393 ppi density)
         Always-on display
Platform
    OS    Android 14, HIOS 14
    Chipset    Mediatek Helio G99 Ultimate
    CPU    Octa-core (2x2.2 GHz Cortex-A76 & 6x2.0 GHz Cortex-A55)
    GPU    Mali-G57 MC2
Memory
    Card slot    microSDXC (dedicated slot)
    Internal    256GB RAM: 8GB
Main Camera
    Dual    50 MP, f/1.9, (wide), 1/1.57", PDAF, OIS
    2 MP, (depth)
    Features    Dual-LED flash, H', 'Phones and Tablets', 'MOBILE PHONES', 'Techno', 10, '{}', '{}', '{"attribute_1":"Iceland Basaltic Dark"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (26, 'Phones and Tablets - MOBILE PHONES - Techno', '2025-06-28 20:45:49.8411+00', true, true, 0, 28598, 0, 123, 'Tecno Camon 30, 6.78" Display, 256GB ROM + 16GB (8GB + 8GB) RAM, 4G (Dual SIM) - 5000mAh - Basaltic Dark + Gifts', '2025-06-28 20:45:49.841102+00', NULL, NULL, 0, 'The Tecno Camon 30 is a mid-range smartphone that was launched in February 2024 as part of the Camon 30 series. It offers a 6.78-inch FHD+ AMOLED display, a 50 MP quad camera system, a 50 MP selfie camera, and a 5,000mAh battery with 70W fast charging. 
Display and DesignThe Tecno Camon 30 features a 6.78-inch FHD+ AMOLED display with a resolution of 1080 x 2436 pixels and a refresh rate of 120Hz. The display is bright and vivid, with a fingerprint scanner embedded under the screen. The device has a sleek and stylish design, with a gradient back panel that comes in Black, Blue, and Orange color options. The device measures 165.3 x 75.3 x 7.7 mm and weighs around 200 grams.
Performance and StorageThe Tecno Camon 30 is powered by the Mediatek Helio G99 Ultimate processor, which is an octa-core chipset with two Cortex-A76 cores clocked at 2.2 GHz and six Cortex-A55 cores clocked at 2.0 GHz. The processor is paired with a Mali-G57 MC2 GPU for graphics performance. The device runs on Androi', '    Operating System: Android 14
    Processor: Helio G99 Ultimate Octa-Core
    6.78" FHD+AMOLED 120Hz
    Front: 50MP AF, Front Dual Colour Temperature Flash
    Rear: 50MP + 2MP + Light Sensor, Dual Flash
    256GB ROM
    16GB RAM (8GB+8GB Extended)
    Infrared Remote Control
    5000mAh Battery Capacity
    70W Ultra Charge - Type-C', 'Phones and Tablets', 'MOBILE PHONES', 'Techno', 10, '{}', '{}', '{"attribute_1":"Basaltic Dark"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (27, 'Phones and Tablets - MOBILE PHONES - Techno', '2025-06-28 20:48:26.327878+00', true, true, 0, 32295, 0, 123, 'Tecno Camon 40 PRO, 8GB RAM + 256GB ROM, 6.78", Dual SIM, 5200mAh, 50MP - Galaxy Black', '2025-06-28 20:48:26.327879+00', NULL, NULL, 0, 'The Tecno phone was announced back in February 2025. The handset features a 6.78-inch AMOLED display, a powerful dual main camera set up with a 50MP primary lens and a 32MP selfie camera at the front. It runs on Android 15 with HiOS 15 and is powered by an impressive and capable Mediatek Helio G100 Ultimate processor to meet the rigors and demands of the 4G handset. The Tecno smartphone, a great improvement from the Camon 30 series, is powered by a massive 5,200mAh non-removable battery and recharged by a wired, 45W fast charging unit.

 

Technology    
GSM / HSPA / LTE
Launch    Announced    2025, March 03
Status    Coming soon. Exp. release 2025, Q2
Body    Dimensions    164.1 x 74.6 x 7.3 mm (6.46 x 2.94 x 0.29 in)
Weight    -
SIM    Nano-SIM + Nano-SIM
Display    Type    AMOLED, 120Hz
Size    6.78 inches, 109.9 cm2 (~89.8% screen-to-body ratio)
Resolution    1080 x 2436 pixels (~393 ppi density)
    Always-on display
Platform    OS    Android 15, HIOS 15
Chipset    Mediatek Helio ', '    DISPLAY-6.78 INCHES
    RAM-8GB
    ROM-256GB
    REAR CAMERA-50 MP
    FRONT CAMERA-32MP
    BATTERY-5200', 'Phones and Tablets', 'MOBILE PHONES', 'Techno', 15, '{}', '{}', '{"attribute_1":"Galaxy Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (29, 'Phones and Tablets - MOBILE PHONES - Techno', '2025-06-28 20:52:58.083001+00', true, true, 0, 12900, 0, 123, 'Tecno POP 8 6.6" - 4GB RAM + 128GB ROM - Android 13 - Dual sim - 5000mAh - Dual Speaker - Gravity Black', '2025-06-28 20:52:58.083008+00', NULL, NULL, 0, 'The phone comes with a 90 Hz refresh rate 6.6-inch touchscreen display offering a resolution of 720x1612 pixels (HD+).Tecno Pop 8 comes with 4GB of RAM. The Tecno Pop 8 runs Android 13 and is powered by a 5000mAh battery. The Tecno Pop 8 supports proprietary fast charging.

As far as the cameras are concerned, the Tecno Pop 8 on the rear packs 13-megapixel camera. It has a single front camera setup for selfies, featuring an 8-megapixel sensor.

Tecno Pop 8 is based on Android T-Go and packs 64GB of inbuilt storage that can be expanded via microSD card (up to 1000GB). The Tecno Pop 8 measures 163.69 x 75.6 x 8.75mm (height x width x thickness)  

Connectivity options on the Tecno Pop 8 include Wi-Fi, GPS, USB OTG, and USB Type-C with active 4G on both SIM cards. Sensors on the phone include fingerprint sensor. The Tecno Pop 8 supports face unlock. Get the best out of the latest model of the Tecno brand. For users who are lovers of photos, good and attractive images for personal and comm', '    Size: 6.6-Inch
    SIM: Dual SIM
    OS: Android 13
    Rear Camera: 13MP
    Front Camera: 8 MP
    Memory: 4GB RAM and 128 GB internal memory
    Dimensions: 163.69 mmx75.6 mmx8.75 mm
    Battery Capacity:: 5000 mAh Li-Polymer battery
    Warranty information: 1 Year Manufacturer Warranty 
    Loudspeaker :Dual Speakers', 'Phones and Tablets', 'MOBILE PHONES', 'Techno', 15, '{}', '{}', '{"attribute_1":"Gravity Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (30, 'Phones and Tablets - MOBILE PHONES - Techno', '2025-06-28 20:56:09.291204+00', true, true, 0, 11190, 0, 123, 'Tecno POP 9, 6.67", 128GB Storage+ 6GB RAM(3GB+3GB Extended RAM), 13MP, 4.5G (Dual SIM) 5000MAh - Black..Lii', '2025-06-28 20:56:09.291205+00', NULL, NULL, 0, 'The smartphone comes with a 6.6 inches LCD display. It provides 720 x 1612 pixels resolution. The rear camera consists of 13 MP + QVGA lenses that allow you to enable Dual-LED flash.

The front camera has a 8 MP sensor. The smartphone is fueled by a Non-removable Li-Ion 5000 mAh battery + 10W wired while the phone runs on Android T Go operating system.

Tecno Pop 9 comes in variant colors. It features USB Type-C 2.0, FM radio, GPS, and Bluetooth 5.0. The device is packed with 3GB RAM/ 64GB internal storage or 4GB RAM(Extended to 8GB)/ 124GB internal storage.

 

The device is built with a glass front, plastic frame, and plastic back while it supports Dual SIM (Nano-SIM, dual stand-by). The dimension of the device is 163.9 x 75.5 x 8.9 mm.

    Processor: Octa-core 
    Dimension: 163.86x75.51x8.9mm
    Network: 2G/3G/4G
    Display: 6.67" 90Hz Hole Screen
    Resolution: 720*1612
    Sensor: The ambient light and distance sensor, G-Sensor, Side-edge fingerprint
    Camera: 8MP Front Ca', 'Color

Startrail Black / Glittery White
 
Operating System

Android 14 Go
 
Processor

T615
 
Network

2G

3G

4G

4.5G (LTE Advanced)
 
Display

120Hz 6.67'''' Hole Screen
 
Resolution

720*1600

 
 
Camera

Front: 8MP, Front Dual Flash

Rear: 13MP, Rear Dual Flash

 
 
Water Resistance

IP54 Rating

 
 
Touch Control

Wet & Oily Touch Control

 
 
Sensor

Side Fingerprint Sensor

Infrared Remote Control

 
 
Battery Capacity

5000mAh

15W Fast Charge

Type-C

 
 
Loudspeaker
Dual Speakers

DTS Sound

 
Memory

128GB ROM+6GB RAM*(3GB+3GB Extended)', 'Phones and Tablets', 'MOBILE PHONES', 'Techno', 15, '{}', '{}', '{"attribute_1":"Black...Lii"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (31, 'Phones and Tablets - MOBILE PHONES - Techno', '2025-06-28 21:00:00.331907+00', true, true, 0, 20900, 0, 123, 'Tecno POVA 6 NEO 6.78 INCHES DISPLAY 8GB RAM +256 GB ROM DUAL SIM BN', '2025-06-28 21:00:00.331908+00', NULL, NULL, 0, 'Power Beyond Limits

 
Dynamic-Tech
Design

 
Super-Endurance
Power System

 
Supersensory
Gaming Experience

 
Ultimate
Performance

 
Stunning Camera

 
HiOS14
Evolving More
Dynamic-Tech
Design
Intelligence Technology, Future

POVA 6 NEO — Design

Speed Black

 

 

 

 

 

 

 

 

 
Super-Endurance
Power System
Long-lasting Power. Uninterrupted
Experience.

POVA 6 NEO — Power
7000mAh  Battery，33W Flash Charge
Power Up and Play On

POVA 6 NEO comes with the largest battery so far available, providing enough power
to meet your high-intensity use for a full day.*

    Calling39H+
    Gaming11H+
    FACEBOOK18H+
    Video Streaming14H+

*Evidenced by data from TECNO LAB

 
1% Super-Endurance Power, Calling For 20mins*

To eliminate your battery anxiety, POVA delves into the enormous potential of 1% battery endurance, making that 1% your savior in moments of urgency.

    Calling20mins
    Gaming5mins+
    Standby4H+

*Based on 1.5 days/charge. Evidenced by data from TECNO LAB

 

 
-1', '    6.78-inch IPS LCD 
    Dual SIM slot
    2G/3G/4G and 5G
    Runs on Android 14 with HioS 14
    8GB RAM with 256GB. No SD card slot
    Front camera: 8MP
    Back cameras: 50MP + 2MP
    7000mAh, 33W wired charging', 'Phones and Tablets', 'MOBILE PHONES', 'Techno', 15, '{}', '{}', '{}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (32, 'Phones and Tablets - MOBILE PHONES - Vivo', '2025-06-28 21:02:09.195017+00', true, true, 0, 30000, 0, 123, 'Vivo V40 Lite- 6.67,- 8GB + 256 GB ROM -(Dual SIM) -5000 MAh- Emerald Green- (2YRs WRTY) + FREE BAG', '2025-06-28 21:02:09.195018+00', NULL, NULL, 0, 'The Vivo V40 Lite is a mid-range smartphone with powerful features and a sleek design. It comes in multiple versions, including 8GB RAM with 256GB storage available in both 4G and 5G models 
The phone features a 50MP main camera with AI capabilities for enhanced portrait photography, and a 32MP front camera for high-quality selfies. It has a 5000mAh battery, which supports 80W fast charging—reaching 80% charge in about 30 minutes—and promises a four-year battery life with 80% capacity retention. Additionally, it is equipped with IP64 dust and water resistance, dual stereo speakers, a high screen-to-body ratio, and a 120Hz refresh rate display for a smooth viewing experience【6†source】【7†source】【8†source】.', '    Dimensions:163.23 × 75.93 × 7.79
    Weight: 188g (Actual weight may vary)
    Material: Premium Glass
    Colors: Emerald Green,
    Operating System: Funtouch OS 14
    Processor: Snapdragon® 685 4G Mobile Platform
    RAM & ROM: 8 GB RAM, 256 GB ROM 
    Battery: 5000 mAh (TYP), 80W Fast Charging
    Network:  Dual SIM Dual Standby
    Card Slot: 2 nano SIMs
    Camera:Front 32 MP, Rear 50 MP + 2 MP
    Flash: Rear flash
    Scene Modes: Various modes for both front and rear cameras
    Media:AAC, WAV, MP3, MIDI, VORBIS, APE, FLAC
    Video Recording: MP4; 3GP; AVI; FLV; MKV; WEBM; TS; ASF
    Connectivity: 2.4 GHz/5 GHz, Bluetooth 5.4', 'Phones and Tablets', 'MOBILE PHONES', 'Vivo', 10, '{}', '{}', '{"attribute_1":"Emarald Green"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (42, 'Phones and Tablets - MOBILE PHONES - Xiaomi', '2025-06-28 21:26:13.413849+00', true, true, 0, 11300, 0, 123, 'XIAOMI Redmi 14C, 6.88" (4GB RAM+128GB Storage) (Dual Sim) 5160mAh', '2025-06-28 21:26:13.41385+00', NULL, NULL, 0, 'Immersive 6.88" display

Refined and stylish design

 

 

 

 

Immersive 6.88" display

Up to 120Hz high refresh rate

 

Massive 5160mAh (typ) battery

Up to 22 hours video playback

Powered by 18W fast charging*

 

50MP AI dual camera

13MP super-clear selfies

 

8.22mm ultra-slim body

Refined and stylish design

 

Powerful octa-core processor

Up to 16GB RAM with Memory extension

 

 

Design

Rounded design aesthetic

Glamour at your fingertips

The rounded design is like a shining star in the night sky, popping out from the device body and creating a sense of visual harmony and elegance.

 

The beauty of nature

Inspired by the serene tranquillity of nature and crafted with exquisite artistry, carry beauty in the palm of your hand at all times.', 'Redmi 14C 

Charger

Warranty card

User manual', 'Phones and Tablets', 'MOBILE PHONES', 'Xiaomi', 10, '{}', '{}', '{}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (33, 'Phones and Tablets - MOBILE PHONES - Vivo', '2025-06-28 21:04:36.486027+00', true, true, 0, 60000, 0, 123, 'Vivo V50 5G 6.77"AMOLED 12/512GB 50MP SD7Gen3, 6000mAh -Mombasa Starry Blue', '2025-06-28 21:04:36.486027+00', NULL, NULL, 0, 'In The Box	

    Handset, Quick Start Guide, USB Cable, Charger, Eject Tool, Phone Case, Protective Film (Applied).

Model Number	

    V2427

Model Name	

    V50 5G

Color	

    Starry Night

Browse Type	

    Smartphones

SIM Type	

    Dual Sim

Hybrid Sim Slot	

    No

Touchscreen	

    Yes

OTG Compatible	

    Yes

Quick Charging	

    Yes

Display Features
Display Size	

    17.2 cm (6.77 inch)

Resolution	

    2392 x 1080 Pixels

Display Type	

    AMOLED

Other Display Features	

    Refresh Rate: 60 Hz/90 Hz/120 Hz, Local Peak Brightness: 4500 nits, Color Gamut: P3 Wide Color Gamut Supported, Light Emitting Material: VM7

Os & Processor Features
Operating System	

    Android 15

Processor Brand	

    Snapdragon

Processor Type	

    7 Gen 3

Processor Core	

    Octa Core

Primary Clock Speed	

    2.63 GHz

Secondary Clock Speed	

    2.4 GHz

Tertiary Clock Speed	

    1.8 GHz

Operating Frequency	

    2G GSM: 850 MHz/900 MHz/1800 MHz, 3G WCDMA: B1/B4/B5/B6/B8, 4G FDD ', '    RAM:  12GB
    Internal Memory:  512GB
    Display: 6.77 inches
    OS: Android 15, up to 3 major Android upgrades, Funtouch 15
    Chipset: Snapdragon 7 Gen 3 (4 nm)
    Main Camera: 50MP+50MP
    Front Camera: 50MP
    Connectivity: 5G, Bluetooth 5.4, Wi-Fi.
    Battery: Si/C 6000 mAh, 60W', 'Phones and Tablets', 'MOBILE PHONES', 'Vivo', 10, '{}', '{}', '{"attribute_1":"Starry Blue"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (34, 'Phones and Tablets - MOBILE PHONES - Vivo', '2025-06-28 21:06:54.602724+00', true, true, 0, 46000, 0, 123, 'Vivo V50 Lite - 6.77'''', 12GB RAM + 256GB ROM - (Dual SIM) - 6500mAh - Titanium Gold', '2025-06-28 21:06:54.602724+00', NULL, NULL, 0, 'Step into the future of smartphones with the vivo V50 Lite — a perfect blend of sleek design, powerful performance, and intelligent photography. Crafted for the modern lifestyle, this device is your go-to companion for both productivity and play.
Sleek Design. Bold Colors.

Available in stunning Black, Gold, Green, and Purple (availability may vary by region), the V50 Lite features a slim 7.79mm profile and weighs just 196g. The premium plastic composite back adds a touch of elegance, while the in-display fingerprint sensor keeps your phone secure and stylish.
Stunning AMOLED Display

Enjoy vibrant visuals on a massive 6.77” AMOLED display with a crisp 2392 × 1080 resolution and smooth up to 120Hz refresh rate. With 1800 nits peak brightness, everything looks stunning even under bright sunlight.
Next-Level Performance

Powered by the Snapdragon 685 (6nm) processor, the V50 Lite offers blazing-fast performance with 8-core CPU architecture (4x2.8GHz + 4x1.9GHz). Multitask with ease thank', 'Display: 6.77" AMOLED, FHD+ (2392 × 1080), 120Hz Refresh Rate

Processor: Qualcomm Snapdragon 685 (6nm), Octa-core

Memory: 8GB RAM + 128GB ROM (Expandable RAM up to 16GB)

Rear Camera: 50MP (Sony IMX882) + 2MP with Aura Light

Front Camera: 32MP Selfie Camera

Battery: 6500mAh, 90W FlashCharge

OS: Funtouch OS 15, Based on Android 15

Security: In-display Optical Fingerprint Sensor

Design: Ultra-slim 7.79mm body, 196g weight

Network: 4G LTE, Dual Nano SIM + OTG Support

Connectivity: Bluetooth 5.0, Wi-Fi 2.4GHz/5GHz, Type-C, NFC (select regions)', 'Phones and Tablets', 'MOBILE PHONES', 'Vivo', 10, '{}', '{}', '{"attribute_1":"Titanium Gold"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (35, 'Phones and Tablets - MOBILE PHONES - Vivo', '2025-06-28 21:09:14.17824+00', true, true, 0, 159900, 0, 123, 'WRNTY_2 Vivo X200 PRO - 6.78-16 GB + 512 GB ROM -2 Nano SIMs - 6000 MAh -Zeiss Camera -Titanium Grey- (2YRs WRTY)', '2025-06-28 21:09:14.178241+00', NULL, NULL, 0, 'The vivo X200 Pro is a flagship smartphone that combines advanced technology with a sleek design. It features a 6.78-inch LTPO AMOLED display with a resolution of 1260 x 2800 pixels, offering vibrant visuals and a peak brightness of 4,500 nits. Powered by the MediaTek Dimensity 9400 chipset, the device ensures high performance and efficiency. It comes with up to 16GB of RAM and offers storage options up to 1TB.It boasts a versatile triple-camera system co-engineered with Zeiss optics. This includes a 50 MP main sensor, a 200 MP telephoto lens with 3.7x optical zoom, and a 50 MP ultra-wide lens. These cameras support advanced features such as 8K video recording and 4K HDR Dolby Vision. A standout feature is its substantial 6,000mAh battery, supporting 90W wired and 30W wireless charging. The device also holds an IP68/IP69 rating, indicating resistance to dust and water, including high-pressure water jets.

Running on Android 15 with vivo''s Origin OS 5, the X200 Pro integrates the latest', '    Dimensions: 162.36 × 75.95 × 8.20 mm
    Weight:223g
    Material: Glass fiber
    Colors: Cosmos Black and Titanium Gray
    Operating System: Funtouch OS_15
    Processor: Dimensity 9400
    RAM & ROM:  16 GB + 512 GB
    Battery:  6000 mAh  energy: 23.04 Wh
    Display:  6.78″
    Network: 2G 3G 4G AND 5G
    Card Slot: 2 nano SIMs
    Camera: Zeiss Camera - Front 32 MP/Rear 50 MP + 50 MP + 200 MP -
    Flash: Rear flash
    Scene Modes:  Snapshot, Landscape, Portrait, Photo, Video, Portrait Video, High Resolution, Pano, Ultra HD Document, Slow-mo, Time-lapse, Stage, Pro, Cultural
    Video Recording: MP4; 3GP; AVI; FLV; MKV; WEBM; TS; ASF 
    Connectivity:  Wi-Fi Display; 2×2 MIMO; MU-MIMO; Wi-Fi 6; Wi-Fi 7; 2.4G & 5G dual-channel concurrent; 2.4G & 6G dual-channel concurrent', 'Phones and Tablets', 'MOBILE PHONES', 'Vivo', 10, '{}', '{}', '{"attribute_1":"Titanium Grey"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (36, 'Phones and Tablets - MOBILE PHONES - Vivo', '2025-06-28 21:11:26.461278+00', true, true, 0, 18000, 0, 123, 'Vivo Y03 6.56" 4GB RAM 128GB ROM 5000mAh 13MP Camera (Dual SIM)- Black(12 Months WRTY)', '2025-06-28 21:11:26.461278+00', NULL, NULL, 0, 'Emerald Green, Innovative "3D corrugated micro-carving" technology, combined with nano-level coating, presents a gem-like color.

Space Black, Shows a mysterious luster like the starry sky, resists scratches and fingerprints, and interprets the classic black with strength.

[Curved design that fits the hand]

Elegant curved design, perfect grip, and stylish streamlined appearance. The thin and light body fits the palm of your hand well, without any extra burden on your hand, and you can easily carry it with you when you go out.

[You can still see the details clearly in the sun]

Y03 6.56-inch HD+ large screen automatically adjusts according to the light intensity of the environment, reducing eye fatigue, and you can still see the details clearly in the sun. Supports high refresh rate, and the picture is smoother.

[Smooth experience, smooth performance]

Less delay, less interference! Smooth use, meeting all scenarios in daily life.

[Bigger battery, faster charging]

5000mAh (standar', 'Network	Technology	GSM / HSPA / LTE
2G bands	GSM 850 / 900 / 1800 / 1900
3G bands	HSDPA 850 / 900 / 2100
4G bands	1, 3, 5, 8, 40
Speed	HSPA, LTE
Body	Dimensions	163.8 x 75.7 x 8.4 mm (6.45 x 2.98 x 0.33 in)
Weight	185 g (6.53 oz)
Build	Glass front, plastic frame, plastic back
SIM	Nano-SIM + Nano-SIM
 	IP54 dust protected and water resistant (water splashes)
Display	Type	IPS LCD, 90Hz
Size	6.56 inches, 103.4 cm2 (~83.4% screen-to-body ratio)
Resolution	720 x 1612 pixels, 20:9 ratio (~269 ppi density)
Platform	OS	Android 14, Funtouch 14
Chipset	Mediatek Helio G85 (12 nm)
CPU	Octa-core (2x2.0 GHz Cortex-A75 & 6x1.8 GHz Cortex-A55)
GPU	Mali-G52 MC2
Memory	Card slot	microSDXC (dedicated slot)
Internal	64GB 4GB RAM, 128GB 4GB RAM
 	eMMC 5.1
Main Camera	Single	13 MP, f/2.2, (wide), PDAF
0.08 MP, f/3.0 (auxiliary lens)
Features	LED flash, panorama
Video	1080p@30fps
Selfie camera	Single	5 MP, f/2.2, (wide)
Video	Yes
Sound	Loudspeaker	Yes
3.5mm jack	Yes
Comms	WLAN	Wi-Fi 802.11 a/b/g/n/ac, dual-b', 'Phones and Tablets', 'MOBILE PHONES', 'Vivo', 10, '{}', '{}', '{"attribute_1":"Emarald Green"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (37, 'Phones and Tablets - MOBILE PHONES - Vivo', '2025-06-28 21:13:28.750447+00', true, true, 0, 18000, 0, 123, 'Vivo Y19s - 6.68'''' - 4GB RAM + 128GB -(Dual Sim) - 5150mAh - Pearl Silver 2YRs', '2025-06-28 21:13:28.750448+00', NULL, NULL, 0, 'The Vivo Y19s is a recently launched mid-range smartphone featuring a 6.68-inch HD+ LCD with a 90Hz refresh rate and up to 1,000 nits of brightness, making it suitable for outdoor visibility. The Unisoc T612 chipset powers it and has an additional 4GB of virtual RAM. The phone includes 128GB of storage, expandable via microSD up to 1TB.

The camera setup includes a 50MP primary sensor, a 0.08MP depth sensor on the rear, and a 5MP front-facing camera. It runs on Android 14 with FunTouch OS 14 and has a 5,150mAh battery that supports 15W charging. Notable features include an RGB notification ring around the rear cameras, a side-mounted fingerprint scanner, and an IP64 rating for splash resistance.', '    Ingress Protection Rating :IP64
    operating systems ; Funtouch OS 14 (based on Android 14)
    Processor : MediaTek Helio G85 (8-core, 12 nm, 2 × 2.0 GHz + 6 × 1.8 GHz)
    RAM & ROM : 4GB RAM, 128GB ROM (expandable up to 1TB)
    Battery : 5150 mAh (TYPE), 15W charging, Li-ion battery
    Design : 165.75 × 76.10 × 8.10 mm, 198g, Composite plastic sheet back cover, Side-mounted fingerprint scanner
    Display : 6.68-inch LCD, 1612 × 720 resolution, 60 Hz refresh rate, 83% NTSC color saturation, LED light-emitting material, capacitive multi-touch
    Network :2G GSM (850/900/1800 MHz), 3G WCDMA (B1/B5/B8), 4G FDD-LTE (B1/B3/B5/B7/B8/B20/B28), 4G TDD-LTE (B38/B40/B41), 5G NR NSA and SA not supported
    card slot; 2 nano SIMs + 1 microSD, Dual SIM Dual Standby (DSDS)
    Camera : Front 8 MP, Rear 50 MP + 2 MP, Various scene modes
    Media :Hi-Fi not supported, Audio playback (AAC, WAV, M4A, MP3, and more), Video playback (MP4, 3GP, AVI, and more), Video recording (MP4), Voice reco', 'Phones and Tablets', 'MOBILE PHONES', 'Vivo', 12, '{}', '{}', '{"attribute_1":"Pearl Silver"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (38, 'Phones and Tablets - MOBILE PHONES - Vivo', '2025-06-28 21:15:37.110997+00', true, true, 0, 20900, 0, 123, 'Vivo Y28 - 6.64" - 8GB RAM + 128 GB (Dual SIM) 6000mAh -Gleaming Orange (2YRs WRTY)+ FREE Vacuum Bottle', '2025-06-28 21:15:37.110997+00', NULL, NULL, 0, 'In current trends, we all love trendy and beautiful gadgets. Y28 comes in 2 colors, Gleaming Orange & Agate Green, to Express your personality and style. When your friends see this phone, they will be impressed by its thin appearance and gorgeous color, and believe me, you will never regret buying it. Our Y28 Comes with an industry-leading 6000mAh battery the biggest in this price range. With the 44W Flash charge you can put your phone on the charger while you prepare your breakfast or drink your coffee it takes only 30 minutes to reach 50%. I guess you definitely won’t lose connection with the world. Choose ours and use your phone all day without power anxiety! Watching videos, movies, and listening to music is much better than the others, with Y28, which comes with dual stereo speakers and an audio booster of up to 300%. Let''s enjoy a premium and immersive watching and listening experience. Switching between the apps now is easier than ever, the up to 8GB RAM allows you to switch bet', '    Dimensions:   164.06 × 76.17 × 8.07 mm
    Weight: 199g
    Material:  2.5D plastic
    Processor:
    RAM: 8 GB
    Storage: 128 GB
    Battery: 6000mAh
    Charging Power: 44W
    Color: Gleaming Orange & Agate Green 
    Screen: 6.64-inch
    Type: LCD
    Touch Screen: Capacitive multi-touch
    Camera;  Front 8MP / Rear 50MP + 2MP + breath light 
    Connectivity; 2.4GHz/5GHz
    Bluetooth: Bluetooth 5.1
    USB: Type-C
    GPS: Supported
    OTG: Supported
    FM: Supported in some countries and regions
    NFC: Supported in some countries ', 'Phones and Tablets', 'MOBILE PHONES', 'Vivo', 10, '{}', '{}', '{"attribute_1":"Vacuum Bottle"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (39, 'Phones and Tablets - MOBILE PHONES - Xiaomi', '2025-06-28 21:18:11.767538+00', true, true, 0, 11500, 0, 123, 'XIAOMI A3 Pro, 6.88", 4GB RAM + 128GB (Dual Sim), 5160mAH,Midnight Black (2YRS WRTY)', '2025-06-28 21:18:11.767538+00', NULL, NULL, 0, 'The Redmi A3 Pro runs on the Mediatek Helio G81 Ultra processor with Mali-G52 MC2 GPU. The Redmi A3 Pro has 4 GB RAM and 128 GB of internal storage which is expandable using microSDXC (dedicated slot). The Redmi A3 Pro has a 6.88 inches, 720 x 1640 pixels IPS display with a pixel density of 260 ppi. Coming to cameras, it has a 50 MP rear camera and a 13 MP front camera for selfies.
It has a USB Type-C port for data syncing and charging. There is a fingerprint sensor present on the Redmi A3 Pro as well, along with a magnetic field sensor (compass) and accelerometer sensor. It is a dual SIM smartphone with support for 3G, Wi-Fi and FM Radio too. The Redmi A3 Pro runs on Android 14 and all this is powered by a 5160 mAh battery. It measures 171.9 x 77.8 x 8.2 mm (height x width x thickness) with a total weight of 204 / 207 / 211 grams including battery.', '    Screen: 6.88″, 720 x 1640 pixels, IPS LCD, 120 Hz
    Chipset: Mediatek Helio G81 Ultra
    Dimensions: 171.9 x 77.8 x 8.2 mm (6.77 x 3.06 x 0.32 in)
    SIM Card Type: Nano-SIM, dual stand-by
    RAM and Storage: 4 RAM , 128GB
    Battery: 5160 mAh, 18W
    Main Camera: 13MP, f/1.8, 1080p
    Android Version: Android 14, HyperOS', 'Phones and Tablets', 'MOBILE PHONES', 'Xiaomi', 10, '{}', '{}', '{"attribute_1":"Midnight Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (40, 'Phones and Tablets - MOBILE PHONES - Xiaomi', '2025-06-28 21:20:42.594176+00', true, true, 0, 8000, 0, 123, 'XIAOMI POCO C71, 6.88", 64GB + 3GB RAM (Dual SIM), 5200mAh, Black', '2025-06-28 21:20:42.594176+00', NULL, NULL, 0, 'The Xiaomi POCO C71 is an affordable smartphone offering a blend of performance, display quality, and battery life. Equipped with a Unisoc T7250 processor, a 6.88-inch HD+ display, and a 5200mAh battery, it''s designed for users seeking value without compromising essential features
Key Features:

    Processor: Unisoc T7250, Octa-core (2x Cortex-A75 @1.8GHz + 6x Cortex-A55 @1.6GHz)
    Display: 6.88-inch HD+ (1640 x 720) IPS LCD, 120Hz refresh rate, 600 nits peak brightness
    Memory: 3GB RAM
    Storage: 64GB, expandable via microSD card
    Rear Camera: 32MP AI dual camera with f/2.0 aperture
    Front Camera: 8MP selfie camera with soft aperture function
    Battery: 5200mAh capacity with 15W fast charging via USB Type-C
    Operating System: Android 15 with HyperOS 2
    Security: Side-mounted fingerprint sensor and AI face unlock
    Additional Features: TÜV Rheinland certifications for eye protection, 240Hz touch sampling rate, and memory extension up to 8GB', '    Processor: Unisoc T7250, Octa-core (2x Cortex-A75 @1.8GHz + 6x Cortex-A55 @1.6GHz)
    Display: 6.88-inch HD+ (1640 x 720) IPS LCD, 120Hz refresh rate, 600 nits peak brightness
    Memory: 3GB RAM
    Storage: 64GB, expandable via microSD card
    Rear Camera: 32MP AI dual camera with f/2.0 aperture
    Front Camera: 8MP selfie camera with soft aperture function
    Battery: 5200mAh capacity with 15W fast charging via USB Type-C
    Operating System: Android 15 with HyperOS 2', 'Phones and Tablets', 'MOBILE PHONES', 'Xiaomi', 10, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (41, 'Phones and Tablets - MOBILE PHONES - Xiaomi', '2025-06-28 21:23:27.551784+00', true, true, 0, 13700, 0, 123, 'XIAOMI Redmi 13 6.79'''' 6GB+128GB Dual SIM, 4G, 5030 MAh - Midnight Black (2YRS WRTY)', '2025-06-28 21:23:27.551784+00', NULL, NULL, 0, '108MP super-clear camera

Ultra clear and super sensitive to freeze any moment
Capture every precious detail

Introducing the revolutionary 108MP super-clear camera to Redmi Series – the ultimate tool for capturing life’s most precious moments in stunning detail.
Whether you’re a photography enthusiast, or simply want a reliable camera to capture great-looking photos with, Redmi 13 is the great choice for you.', 'Network
 

    Technology GSM / HSPA / LTE
    2G bands    GSM 850 / 900 / 1800 / 1900 - SIM 1 & SIM 2
    3G bands    HSDPA 850 / 900 / 2100
    4G bands    1, 3, 5, 7, 8, 20, 28, 38, 40, 41
    Speed    HSPA, LTE

Launch
 

    Announced    2024, June 03
    Status    Available. Released 2024, June 03

Body
 

    Dimensions    168.6 x 76.3 x 8.3 mm (6.64 x 3.00 x 0.33 in)
    Weight    205 g (7.23 oz)
    Build    Glass front, plastic frame, glass back
    SIM    Hybrid Dual SIM (Nano-SIM, dual stand-by)
         IP53, dust and splash resistant

Display
 

    Type    IPS LCD, 90Hz, 550 nits (HBM)
    Size    6.79 inches, 109.5 cm2 (~85.1% screen-to-body ratio)
    Resolution    1080 x 2460 pixels (~396 ppi density)
    Protection    Corning Gorilla Glass

Platform
 

    OS    Android 14, HyperOS
    Chipset    Mediatek Helio G91 Ultra (12 nm)
    CPU    Octa-core (2x2.0 GHz Cortex-A75 & 6x1.8 GHz Cortex-A55)
    GPU    Mali-G52 MC2
     

Memory
 

    Card slot    microSDXC (uses', 'Phones and Tablets', 'MOBILE PHONES', 'Xiaomi', 10, '{}', '{}', '{"attribute_1":"Midnight Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (43, 'Phones and Tablets - MOBILE PHONES - Xiaomi', '2025-06-28 21:30:27.674282+00', true, true, 0, 8900, 0, 123, 'XIAOMI Redmi A5, 6.88", 3GB + 64GB , 5200mAh, DUAL SIM, 4G - Midnight Black', '2025-06-28 21:30:27.674282+00', NULL, NULL, 0, 'The Redmi A5 is the perfect smartphone for those who want a great combination of performance and affordability. With a massive 6.88-inch display, smooth 120Hz refresh rate, and a powerful 3GB RAM, this phone ensures an optimal experience for everyday tasks, gaming, and media consumption. Whether you’re browsing, taking photos, or streaming, the Redmi A5 gives you everything you need without breaking the bank. The Redmi A5 offers an array of features that are designed to provide value while maintaining a sleek and functional design. Powered by the Unisoc T7250 chipset, the Redmi A5 handles day-to-day tasks effortlessly. 

 

The Redmi A5 comes with a 32MP main camera and a secondary 0.08MP sensor, allowing you to take vibrant and detailed photos with ease. Whether you''re capturing landscapes, close-up shots, or portraits, this camera system gives you the versatility you need. The 8MP front camera ensures sharp and clear selfies for all your social media posts or video calls. The Redmi A', 'Network   
 

    Technology   GSM / HSPA / LTE
    2G bands    GSM 850 / 900 / 1800 / 1900
    3G bands    HSDPA 850 / 900 / 1900 / 2100
    4G bands    LTE
    Speed    HSPA, LTE
     

Launch
 

    Announced    2025, March 21
    Status    Available. Released 2025, March 21
     

Body
 

    Dimensions    171.7 x 77.8 x 8.3 mm (6.76 x 3.06 x 0.33 in)
    Weight    193 g (6.81 oz)
    SIM    Nano-SIM + Nano-SIM
         Dust and splash resistant
     

Display
 

    Type    IPS LCD, 120Hz, 1500 nits (HBM)
    Size    6.88 inches, 112.4 cm2 (~84.1% screen-to-body ratio)
    Resolution    720 x 1640 pixels (~260 ppi density)
     

Platform
 

    OS    Android 15 (Go edition), up to 2 major Android upgrades, HyperOS
    Chipset    Unisoc T7250 (12 nm)
    CPU    Octa-core (2x1.8 GHz Cortex-A75 & 6x1.6 GHz Cortex-A55)
    GPU    Mali-G57 MP1
     

Memory
 

    Card slot    microSDXC (dedicated slot)
    Internal    64GB 3GB RAM
         eMMC 5.1
     

Main Camera
 

    Single   ', 'Phones and Tablets', 'MOBILE PHONES', 'Xiaomi', 10, '{}', '{}', '{"attribute_2":"Midnight Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (44, 'Phones and Tablets - MOBILE PHONES - Xiaomi', '2025-06-28 21:32:30.610374+00', true, true, 0, 20000, 0, 123, 'XIAOMI Redmi Note 14, 6.67", 128GB + 6GB RAM (Dual SIM), 5500mAh, Black', '2025-06-28 21:32:30.610375+00', NULL, NULL, 0, 'The Redmi Note 14 combines cutting-edge performance, a vibrant display, and intelligent camera capabilities to deliver a seamless smartphone experience. Designed for users who demand speed and efficiency, this device ensures you''re always ahead of the curve.', 'Processor

    Helio G99-Ultra6nm manufacturing process technology
    CPU: Octa-core processor, up to 2.2GHzGPU: Mali-G57 MC2

Storage & RAM

     6GB RAM + 128GB 

Dimensions

    Height:163.25mm 
    Width: 76.55mm 
    Thickness: 8.16mm 
    Weight: 196.5g

Display

    6.67" AMOLED display
    Resolution: 2400 × 1080Refresh rate: Up to 120HzTouch sampling rate: 240HzBrightness: 1800nits peak brightness
    Brightness: HBM 1200 nits (typ)Color depth: 8 bit
    Contrast ratio: 5,000,000:1100% DCI- P3 wide color gamut
    PPI 394Corning® Gorilla® Glass 5Sunlight display
    Reading mode960Hz PWM dimming｜TÜV Rheinland Low Blue Light Certification (Hardware solution) - TÜV Rheinland Circadian Friendly Certification - TÜV Rheinland Flicker Free CertificationSGS Low Blue Light Certification

Rear Camera

    108MP+2MP+2MP triple camera108MP main camera0.64μm, 9in1 1.92μmf/1.76P lens1/1.67” sensor size2MP depth cameraf/2.42MP macro cameraf/2.4Rear camera video recording1080p at 60fps1080p', 'Phones and Tablets', 'MOBILE PHONES', 'Xiaomi', 17, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (45, 'Phones and Tablets - MOBILE PHONES - Xiaomi', '2025-06-28 21:34:15.493231+00', true, true, 0, 55000, 0, 123, 'XIAOMI Redmi Note 14 Pro+ 5G, 6.67", 512GB + 12GB (Dual SIM), 5110mAh, Frost Blue (1YR WRTY)..', '2025-06-28 21:34:15.493232+00', NULL, NULL, 0, 'Redmi Note 14 Pro+ 5G redefines what a smartphone can offer. At its core, the 200MP pro-grade AI camera system empowers you to capture every moment with incredible detail. Equipped with 45W turbo charging and a robust 5110mAh battery, the Redmi Note 14 Pro+ 5G ensures you stay connected and powered throughout your busiest days, with just a few minutes of charging delivering hours of usage. The MediaTek Dimensity 7300-Ultra processor handles everything from intense gaming to seamless multitasking with ease, ensuring top-tier performance at all times. Its 6.67" CrystalRes AMOLED display, with a 1.5K resolution and a smooth 120Hz refresh rate, not only brings your content to life with vibrant colors but also protects your eyes with advanced eye-care technology.', 'Processor

    MediaTek Dimensity 7300-Ultra
    4nm manufacturing process
    CPU: Octa-core processor, up to 2.5GHz
    GPU: Mali-G615 MC2

Storage & RAM

    RAM: 12GB
    Internal: 512GB

Dimensions

    Height: 162.33mmWidth: 74.42mmThickness:Coral Green & Midnight Black 8.4mm丨Lavender Purple 8.55mmWeight: 190gDAS

Display

    6.67" CrystalRes AMOLED display
    Resolution: 2712 x 1220 (1.5K resolution)
    Refresh rate: Up to 120Hz
    Touch sampling rate: Up to 480Hz
    Brightness: 3000nits peak brightness
    Color depth: 12bit
    Contrast ratio: 5,000,000:1
    DCI-P3 wide color gamut
    Corning® Gorilla® Glass Victus® 2
    Supports Dolby Vision®
    Reading mode
        1920Hz PWM dimming｜20,000-level brightness adjustment｜HDR10+ - TÜV Rheinland Low Blue Light (Hardware Solution) Certified - TÜV Rheinland Flicker Free Certified - TÜV Rheinland Circadian Friendly Certified

Rear camera

    200MP main camera
    OISf/1.65
    16-in-1 binning into one large 2.24μm pixel
  ', 'Phones and Tablets', 'MOBILE PHONES', 'Xiaomi', 10, '{}', '{}', '{"attribute_1":"Frost Blue"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (46, 'TVs and Audio - HOME AUDIO - Amtec', '2025-06-30 19:32:49.024892+00', true, true, 0, 4500, 0, 123, 'Amtec AM-314 3.1CH X-BASS Multimedia Home Theater System 12000W PMPO', '2025-06-30 19:32:49.024892+00', NULL, NULL, 0, 'Feel the Power. Hear the Detail.

Turn your home into an entertainment powerhouse with the Amtec AM-314! Designed with 3D Real Sound and deep X-BASS technology, this 3.1 channel system delivers crystal-clear audio and thundering bass that brings your music, movies, and games to life.

With bold aesthetics and Bluetooth convenience, the AM-314 is a showstopper—whether it’s game night, party time, or movie marathon mode!', 'Power Output: 60W

Frequency Response: 38Hz–20KHz

Distortion: 0.3% at 1W

S/N Ratio: ≥70dB

Stereo Separation: ≥45dB

Voltage: AC220–240V, 50/60Hz

Drive Units: 6.5"x1 + 3"x3

Impedance: 4Ω

USB & SD Input Ports

Input & Mode Selection via Remote

ON/OFF Power Switch Speaker

Weight: 6.3kg

Dimensions: 40(L) x 37.5(W) x 36(H) cm', 'TVs and Audio', 'HOME AUDIO', 'Amtec', 16, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (47, 'TVs and Audio - HOME AUDIO - Amtec', '2025-06-30 19:36:44.080278+00', true, true, 0, 1100, 0, 123, 'C15 WIRELESS BLUETOOTH Speaker BT/USB/TF/DC5V/AUX SUPERBASS // SMART PORTABLE SPEAKER WITH STEREO SOUND AND USB CHARGING', '2025-06-30 19:36:44.080278+00', NULL, NULL, 0, 'Bluetooth  Compact and lightweight design - Up to 10 hours of music playback - High fidelity sound - Integrated microphone (hands-free function) -  water and dust resistance

Stop wasting your time fighting with wires and feeling limited by relying on plugs. Go wireless and enjoy your music outdoors with the new Portable Speaker. It''s beautifully designed and lightweight, with Bluetooth 5.0 connectivity, waterproof  rating and a great price.

So take it with you to the ends of the earth thanks to its compact body (13.6 centimeters in diameter) and light weight (582 grams), which you can carry comfortably in a handbag without taking up much space. High Quality Sound with Excellent Internal Structure

The feeling will be totally pleasant for your ears... It''s hard to believe that the Portable Bluetooth Speaker Mini, being so small, plays such high quality audio... But it does.

Smooth stereo sound - Room-filling stereo and enhanced bass through dual high-performance drivers and a unique ', 'Room-filling stereo and enhanced bass through dual high-performance drivers and a unique spiral bass port loud enough to hear from anywhere in the room - Suitable for a more enjoyable background music in a room and outdoors setting - Built-in high-sensitivity microphone perfect for conference calls, working, teaching, learning, cleaning, etc - Portable and compact size that you can move it around with you using the onboard stylish strap - Easy control with volume, play/pause, answer buttons all on the top of the speaker - Long playtime with the built-in 1200mah high performance li-ion battery - 6-15 hours of music at 2/3 volume, this means you can enjoy morning music for a week for one full charge if let it work 2- 3 hours every day - True wireless stereo, immerse high-fidelity sound - Output power: 5W - Speaker: 66mm, 1, 5W - Working voltage: DC5V - Lithium ion battery: 1200mAh - Dimensions: 157 x 157 x 114mm - Package contains: C15 speaker, USB charging cable, 3.5mm-to-3.5mm stereo c', 'TVs and Audio', 'HOME AUDIO', 'Amtec', 15, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (48, 'TVs and Audio - TELEVISIONS - Hisense TV', '2025-06-30 19:39:10.100421+00', true, true, 0, 24000, 0, 123, 'Hisense 43 Inch 43A4KKEN Smart TV (2YRs WRTY)', '2025-06-30 19:39:10.100421+00', NULL, NULL, 0, 'Hisense 43A4K 43 inch FHD Smart TV . Featuring Natural Colour Enhancer technology and Crystal-Clear Resolution, the Hisense 43A4K 43 inch Smart TV offers a stunning viewing experience with optimized color reproduction and cleaner, pixel-perfect noise reduction.

 

Find great entertainment fast with VIDAA Smart TV. Switch between apps and connected devices, receive recommendations, and search thousands of shows across Netflix, YouTube, Prime Video, Disney+, Kayo, Foxtel, Stan iView, Freeview Plus and many more.

 

Connect your Hisense 43A4K 43 inch TV to content via USB, HDMI, and the internet with ease to access a wide array of internet services. Browse the web, stream music and video on demand, check the weather, and get sports info, updates, and more.

 

Game Mode boosts your chances of scoring legendary wins by significantly reducing input lag. The shorter delay between input and reactions to on-screen developments is particularly important for fast-paced, competitive games. It g', '    Bezelless Design
    Natural Colour Enhancer
    Noise Reduction
    DTS Virtual X
    Vidaa Smart OS
    WiFi Built in', 'TVs and Audio', 'TELEVISIONS', 'Hisense TV', 15, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (49, 'TVs and Audio - HOME AUDIO - Vitron', '2025-06-30 19:42:10.980942+00', true, true, 0, 19500, 0, 123, 'Jbl Clip 4 squad - Portable Mini Bluetooth Speaker, big audio and punchy bass, integrated carabiner, IP67 waterproof and dustproof, 10 hours of playtime, speaker for home, outdoor and travel', '2025-06-30 19:42:10.980942+00', NULL, NULL, 0, 'Cool, Waterproof Portable, and Rechargeable. The vibrant fresh looking JBL Clip 4 delivers surprisingly rich JBL Original Pro Sound in a compact package. The unique oval shape fits easy in your hand. Fully wrapped in colorful fabrics with expressive details inspired by current street fashion, it’s easy to match your style. The fully integrated carabiner hooks instantly to bags, belts, or buckles, to bring your favorite tunes anywhere. Waterproof, dustproof, and up to 10 hours of playtime, it’s enough to use along wherever you explore. Includes USB Type C charging cable.', '    Ip67 Waterproof And Dustproof - Bring It To The Beach, Pool, Park Or Anywhere As The Clip 4 Is Ip67 Waterproof And Dustproof.
    Jbl Pro Sound Delivers Super Rich Audio And Bass From Clip 4’S Compact Size.
    Listen To Your Music From Your Phone, Tablet, Or Any Other Bluetooth-Enabled Device.
    Included Components: Jbl Clip 4, Type C Usb Cable
    Power Source Type: Battery Powered', 'TVs and Audio', 'HOME AUDIO', 'Vitron', 17, '{}', '{}', '{"attribute_1":"Green"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (50, 'TVs and Audio - HOME AUDIO - Vitron', '2025-06-30 19:44:49.619646+00', true, true, 0, 1500, 0, 123, 'Robot Multimedia Bluetooth Speaker- ORIGINAL', '2025-06-30 19:44:49.619646+00', NULL, NULL, 0, 'You want to travel, go camping or just relax in your house while enjoying some cool music? Then this small portable Bluetooth speakers are what you need.
You can load music onto an sd card or flash disk, or simply play from your phone. This is a rechargeable speaker, hence you can charge it and use later as you take a walk in the woods or ride your bike. You can adjust the volume to play soft or loud, however you like it. Get this new product for yourself, or someone you love at the most affordable price. Place your order today on Jumia Kenya and have it delivered to your doorsteps. Enjoy the following functionalities:

    MP3 music format playback
    USB and TF card reader playback
    Digital FM tuner (87.5- 108.0 MHz)
    Mobile charge function
    Built in rechargeable lithium battery
    Wireless speaker', '    MP3 music format playback
    USB and TF card reader playback
    Digital FM tuner (87.5- 108.0 MHz)
    Mobile charge function
    Built in rechargeable lithium battery
    Wireless speaker', 'TVs and Audio', 'HOME AUDIO', 'Vitron', 18, '{}', '{}', '{"attribute_1":"Blue-black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (51, 'TVs and Audio - TELEVISIONS - Vision Plus', '2025-06-30 19:47:21.563728+00', true, true, 0, 20000, 0, 123, 'Vision Plus 43" FHD ANDROID TV + Free Wall Mount + 2 Year WRNTY', '2025-06-30 19:47:21.563728+00', NULL, NULL, 0, 'The Vision Plus 43" Smart TV runs on a customized Android OS, delivering crisp 1080p Full HD picture quality paired with immersive Dolby audio. This budget-friendly smart TV comes preloaded with essential streaming apps like YouTube, Netflix, and Prime Video ready to use out of the box. Connect wirelessly to stream your favorite content or install additional apps via the built-in third-party app store or USB sideloading. The intuitive, Android-based interface makes navigation simple, while the e-share app transforms your phone into a convenient remote control. Enjoy the perfect balance of smart features, flexibility, and affordability.
 ', 'Technical Specifications

Display

    Backlight Type    DLED
    Aspect Ratio    16:9
    Resolution    3840 X 2160
    Refresh Rate    60Hz
    Luminance    200 cd/m²±10%
    Contrast Ratio    1200:1
    Display Colours    16.7M
    Response Time    8ms
    Viewing Angle    176H/176V
     

Features

    OSD Language/OSD    English,Vietnamese,Thai,Arabic,Russian,Malaysia,Turkish,French
    Sleep Timers    Yes
    Auto Shut off    Yes
    Hotel Mode    Yes
    Max Storage Channels    ATV:99CH
    DVB-T+DVB-C:700CH； DVB-S/S2:No Limit
    HDMI Version/HDMI    1.4       HDCP　Version:1.4/2.2
    USB Chanel Function/USB    SW Upgrade, Multimedia
    Other    EPG，Subtitle，LCN
     

System

    CPU    ARM cortex –CA55*4 1.5GHz
    GPU    G31MP2 550MHz
    RAM    1GB
    FLASH Memory    8GB
    WIFI    2.4G,Support 802.11b/g/n
    Ethernet    10M/100M
    Android    14
    App    Media Center,Stark_store
    TV Input    ATV/DVB-C/T,DVB-T2/DVB-S/S2
    Video System    ATV:PAL, SECAM
    DTV: ', 'TVs and Audio', 'TELEVISIONS', 'Vision Plus', 15, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (52, 'TVs and Audio - HOME AUDIO - Vision Plus', '2025-06-30 19:50:34.218929+00', true, true, 0, 16000, 0, 123, 'Vision Plus Beat Box 2 - Black, (1YR WRTY)', '2025-06-30 19:50:34.218929+00', NULL, NULL, 0, 'Embark on a unique music journey with Vision Plus Beat Box 2 – an entertainment powerhouse that guarantees an unmatched audio experience. Immerse yourself in rich bass, 2X 6.5" woofer, TWS connectivity, and a karaoke function, adding a fun twist to your gatherings. With features like USB drive support, dance lights, and up to 6 hours of playback time, Beat Box 2 ensures a dynamic and enjoyable audio adventure. Backed by a reassuring 1-year warranty, it''s the perfect companion for your musical escapades.

This state-of-the-art speaker system is engineered to deliver an unparalleled listening experience, whether you''re enjoying your favorite music, podcasts, or movies.

The Beat Box 2 features advanced audio technology that produces crystal-clear sound with deep bass and crisp highs. With a total output power of 50 watts, this speaker system is capable of filling any room with rich, immersive sound. Whether you''re hosting a party or simply relaxing at home, the Beat Box 2 will elevate yo', '    Powerful Bass
    2 * 6.5" Woofer
    Karaoke Function
    Remote Control
    USB Drive Support
    TWS Connect
    FM Radio
    Aux Input
    Dance Lights
    Bluetooth
    Up to 6 Hours Playback Time
    1 Year Warranty', 'TVs and Audio', 'HOME AUDIO', 'Vision Plus', 10, '{}', '{}', '{"attribute_1":"Black-b-red"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (53, 'TVs and Audio - HOME AUDIO - Vitron', '2025-06-30 19:52:26.065287+00', true, true, 0, 2800, 0, 123, 'Vitron V400 2.1Ch Bluetooth Speaker System', '2025-06-30 19:52:26.065288+00', NULL, NULL, 0, 'Vitron audio delivers the wide range of options in home theatre entertainment systems. Our systems feature a seamless design with powerful full-range drivers to deliver powerful, clear 360° stereo sound with deep bass. Extra wired subwoofer pumping out ground-shaking bass for immersive home theatre experience at home. 
 

The Bluetooth speaker system plays FM radio, and MP3 from the USB and SD card slots. 
Delivering intuitive sound features that let you choose the quality of performance you need, and clear LED displays to improve your usability. Our home theatre speakers come in wide range of built-in add-ons, like Bluetooth, Auxilliary, USB, and Micro SD in addition to supporting MP3, FM Radio and many more. ', '    2.1Ch Multimedia Speaker System AC/DC/BT – V400
    Power output: 5000W
    Frequency response: 35Hz-20KHz
    Distortion:03.%at 1W
    S/N ≥ 68dB
    Voltage:AC220-240V 50/60Hz Function
    ON/OFF Power Switch
    USB SD Input Speaker
    BT DC-12V
    Speaker driver: SW:4"*1, Satellite:5w*2
    Impedance: 4Ʊ  
    Weight: 4.5kg', 'TVs and Audio', 'HOME AUDIO', 'Vitron', 10, '{}', '{}', '{"attribute_1":"Grey"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (55, 'Health and Beauty - PERSONAL CARE', '2025-06-30 19:59:43.541033+00', true, true, 0, 500, 0, 123, 'NIVEA MEN Active Lip Balm For Men - 4.8g (Pack Of 2)', '2025-06-30 19:59:43.541034+00', NULL, NULL, 0, 'NIVEA MEN Active lip Balm was developed specifically for the needs of men. It is fragrance-free and doesn''t leave any shine and color on your lips.
 It is designed to protect your lips from drying out and provides them with a long-lasting and shine-free care every day. Perfect for the man who needs lip moisture without the tell-tale signs of a regular lip product. The specially crafted formula gives your lips long-lasting, effective moisturizing care and protection. The shine-free, fragrance-free, color-free finish looks like you''re not wearing anything on your lips at all. 

With SPF 15 it also protects your lips against the harmful effects of the sun. Enjoy 24h moisture and protect your lips against wind & weather!', 'Provides 24hr moisture and care for your lips
Effectively protects lips in all weather conditions
Contains SPF 15 - protects against UVA and UVB rays
Contains natural oils enriched with vitamins
 Made from ethically sourced shea butte', 'Health and Beauty', 'PERSONAL CARE', '', 10, '{}', '{}', '{"attribute_1":"Blue"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (56, 'Health and Beauty - PERSONAL CARE', '2025-06-30 20:01:45.197213+00', true, true, 0, 900, 0, 123, 'Provides 24hr moisture and care for your lips Effectively protects lips in all weather conditions Contains SPF 15 - protects against UVA and UVB rays Contains natural oils enriched with vitamins  Made from ethically sourced shea butte', '2025-06-30 20:01:45.197213+00', NULL, NULL, 0, ' NIVEA MEN Cool Kick is a daily moisturiser that combines an instant cooling complex and menthol to provide men with an instant and long lasting cooling effect. This non-greasy formula is enriched with instant cooling complex and Hydra IQ, it cools the skin and provides a freshly showered feeling that lasts throughout the day. This body lotion daily moisturizes the skin is fast absorbing and suited for all skin types from normal, dry, and oily and is dermatologically approved. The formula delivers instant and long-lasting cooling effect and absorbs in seconds. Want a cooling, freshly showered feeling that lasts? Go for it - cool kick body lotion. For healthy looking skin!

    Provides 48 hour moisture
    Fast absorbing formula
    Not need to reapply
    For all skin types 
    Non greasy and Freshly showered feeling.imageINGREDIENTS : Aqua, Glycerin, Caprylic/Capric Triglyceride, Myristyl Myristate, Alcohol Denat., Dimethicone, Cetearyl Alcohol, Glyceryl Stearate Citrate, Octyldodec', '    Provides intensive 48 hour moisture
    Delivers instant and long lasting cooling effect
    Fast absorbing formula, no stick feeling
    Volume: 400ml
    For all skin types
    Type: Body Lotion
    Gender: For Men', 'Health and Beauty', 'PERSONAL CARE', '', 10, '{}', '{}', '{"attribute_1":"Blue"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (58, 'Health and Beauty - FACIAL SKIN CARE', '2025-06-30 20:07:21.56804+00', true, true, 0, 500, 0, 123, 'Romano CLASSIC DELUXE SHOWER GEL 650GM', '2025-06-30 20:07:21.568041+00', NULL, NULL, 0, 'The Romano Classic Deluxe Shower Gel 650g is a premium grooming product designed for men, offering a refreshing and invigorating shower experience.​
Key Features

Dual Functionality: This shower gel combines shampoo and body wash, simplifying your grooming routine. ​

Moisturizing Formula: Enriched with Sodium PCA, it helps retain skin moisture, leaving your skin feeling soft and hydrated. ​

Masculine Fragrance: Inspired by Italian style, it features the freshness of lavender blended with warm sandalwood, providing a sophisticated and confident aroma. ​

Pro Vitamin B5 Enrichment: Contains Pro Vitamin B5 to promote healthy, strong hair and a clean, vibrant scalp. ​

Safe for Skin: Free from alcohol, colorants, and preservatives, making it suitable for all skin types, including sensitive skin. ​
Usage Instructions

Apply a generous amount of the shower gel to wet skin or hair.​

Lather and massage gently.​

Rinse thoroughly with water.​
Storage Recommendations

Keep the bottle in a coo', '    The Romano Classic Deluxe Shower Gel 650g is a premium grooming product tailored for men, offering a refreshing and invigorating shower experience.
    2-in-1 Functionality: This shower gel combines shampoo and body wash, simplifying your grooming routine.
    Moisturizing Formula: Enriched with Sodium PCA, it helps retain skin moisture, leaving your skin feeling soft and hydrated. ​
    Masculine Fragrance: Inspired by Italian style, it features the freshness of lavender blended with warm sandalwood, providing a sophisticated and confident aroma.
    Pro Vitamin B5 Enrichment: Contains Pro Vitamin B5 to promote healthy, strong hair and a clean, vibrant scalp. ​
    Safe for Skin: Free from alcohol, colorants, and preservatives, making it suitable for all skin types, including sensitive skin. ​', 'Health and Beauty', 'FACIAL SKIN CARE', '', 10, '{}', '{}', '{"attribute_1":"Green"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (59, 'Health and Beauty - FACIAL SKIN CARE', '2025-06-30 20:09:06.658278+00', true, true, 0, 600, 0, 123, 'SADOER 3 in 1, Salicylic Acid Acne Treatment Essence + Niacinamide Brightening Serum + Vitamin C Brightening Essence', '2025-06-30 20:09:06.658278+00', NULL, NULL, 0, 'Sadoer Vitamin C Serum is a powerful antioxidant that works to stimulate collagen production in your skin. It also fights fine lines, brightens your complexion, and provides a host of other benefits. Skincare experts also tout it as one of the best anti-aging ingredients you could ever use.

Sadoer Salicylic Acid Acne Treatment Essence and Blackheads remover. This serum helps control Skin oil and eliminates all acnes and blackheads. The Product clears the skin, moisturize and maintain Youthful Skin

Niacinamide is a multipurpose skin Care ingridients. It helps build keratin, a protein that maintains skin health. It’s also been shown to make your skin stronger, smoother and brighter.

“Niacinamide is used to treat acne and can help nourish and protect your skin,Oil Control

    Skin Brightening
    Whiten Dark Spots
    Moisturize
    Acne Treatment', '    Oil Control
    Skin Brightening
    Whiten Dark Spots
    Moisturize
    Acne Treatment', 'Health and Beauty', 'FACIAL SKIN CARE', '', 10, '{}', '{}', '{"attribute_1":"White"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (60, 'Health and Beauty - HAIR CARE', '2025-06-30 20:10:58.692431+00', true, true, 0, 1900, 0, 123, 'Super Jojo Natural Bouncy Women Headband Wig + Free Gift Inside!!', '2025-06-30 20:10:58.692431+00', NULL, NULL, 0, 'Headband wig is so versatile you can wear this pretty much anywhere. Quick and easy to put on, true to length & soft and bouncy. The headband wig is easy to put and take off. It comes in handy when one is on the go. Ideal for everyday wear. 

This headband wig is easy to maintain, can be washed and blow dried and flat ironed. Hair Material: 150% Density Brazilian synthetic hair blend. unprocessed curlyi hair blend. 

All you need to do is take it and receive a lot of compliments！
Show Your Own Hairline & Edges

    Leads to a super realist natural look.
    No one will recognize this as a wig!

Easy To Wear! 2 Minutes

You are able to Wear this wig within 2 minutes! Just Put on and go!
Can be styled in many Ways

    Show Your Own Natural Hairline.
    Can be in a bun, half up half down, flowing.
    New Design: A elastic silk headband instead of the lace part, more suitable for the head, no glue, no gel, comfortable and healthy, & designed in the style you like, save more installation', '    Style: Headband wig curly
    Universal Head fitting
    Material: Heat resistant synthetic 
    Length: 16inches Headband wig
    Color: 1B# curly Headband wig
    Density: 150 Heavy density
    Cap size: Large size cap, headband wig circumference is 22.5inches', 'Health and Beauty', 'HAIR CARE', '', 10, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (61, 'Health and Beauty - FACIAL SKIN CARE', '2025-06-30 20:13:06.812489+00', true, true, 0, 700, 0, 123, 'Vaseline Intensive Care Cocoa Radiant Body Oil For Glowing Skin-200ml', '2025-06-30 20:13:06.81249+00', NULL, NULL, 0, 'Made with cocoa butter and a blend of Vaseline Jelly, Vaseline Intensive Care Cocoa Radiant Body Gel Oil helps keep your skin looking healthy and fresh. Our rich formula combines 100% pure cocoa and shea butters, giving you a natural glow. Deep Moisturizing Daily Body Gel Oil Vaseline Intensive Care Cocoa Radiant Body Gel Oil goes beyond basic moisturization.Our Intensive Care range works to heal dry skin deep down. Vaseline Intensive Care Cocoa Radiant Body Gel Oil contains healing micro-droplets of Vaseline Jelly that lock in moisture. Our moisturizing body gel oil restores the essential moisture your skin needs with a blend of nourishing ingredients and gives skin a natural, healthy glow. With daily exposure to environmental triggers, skin''s natural moisture barrier can break down, allowing for water to escape the skin', '    Vaseline Intensive Care Cocoa Radiant Body Gel Oil with pure cocoa butt and replenishing oils for healthy glowing skin
    This vitalizing body oil from Vaseline''s Intensive Care locks in moisture to help revitalise dry and dull-looking skin
    This body oil absorbs quickly and heals dry skin for glowing radiance with non-greasy, rich moisturisation
    Contains 100 Percent pure cocoa butter and replenishing oils for the ultimate skin care experience. Suitable for use on sensitive skin.', 'Health and Beauty', 'FACIAL SKIN CARE', '', 10, '{}', '{}', '{"attribute_1":"Grey"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (62, 'Fashion - MEN''S CLOTHING - Forever Young', '2025-06-30 20:24:16.355814+00', true, true, 0, 700, 0, 123, '3-Pack Neck Round Heavy Duty 160 GSM T-shirts - White/Navy Blue/White', '2025-06-30 20:24:16.355814+00', NULL, NULL, 0, 'Revamp your casual collection with this t-shirt. Made from cotton fabric, this t-shirt stays extremely soft against the skin. It  features a classic Round neck, solid pattern and short sleeves giving it a bold structure. These casual T-shirts will give you the best look you desire. The 100% cotton is a premium product with a classic fit. Order yours today and have it delivered to your doorstep.', 'Key Features

    Fabric : 100% Cotton
    Heavy Duty
    160 GSM
    Neck: Round Neck
    Type: T-shirt
    Sleeve Style: Short sleeves
    Style: Casual', 'Fashion', 'MEN''S CLOTHING', 'Forever Young', 15, '{}', '{}', '{"attribute_1":"White/Navy","attribute_2":"Blue/White"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (63, 'Fashion - KID''S FASHION - Forever Young', '2025-06-30 20:28:29.883538+00', true, true, 0, 800, 0, 123, '2Pcs/Sets Baby Clothes Suit Boys Children Hoodies Pants', '2025-06-30 20:28:29.883538+00', NULL, NULL, 0, '2Pcs/Sets Toddler Costume Kids Tracksuits For 0-5 Years

1 Package :Hoodies +Pants

Color : Navy Blue

Choose 1-1.5 Year: Send size M.Suitable For Height 75-85cm, Weight For 10-12kg

Choose 2-3 Year : Send size L.Suitable For Height 85-95 cm,Weight For 12-14kg

Choose  3-4 Year : Send size XL.Suitable For Height 95-105 cm,Weight For 14-17kg

Choose  4-5 Year : Send size XXL.Suitable For Height 105-115 cm,Weight For 17-22kg

About shipping

Shipping and Packaging All it will be double checked and well packed before sending.It will be dispatched within 1 business day after buyers pay for the order. It usually takes about 1 to 7 working days for delivering the package to the destination

Special Announcement

Please fill in the correct and detailed consignee, address and phone number in the order. For fast and correct delivery.If you do not receive order within 10 working days,please feel free to contact Customer Service before leaving Negative and Neutral Feedback, we will do our best to', '    2Pcs/Sets
    kids boy
    navy blue
    hoodies+pants
    spring autumn winter
    1-5 year old', 'Fashion', 'KID''S FASHION', 'Forever Young', 10, '{}', '{}', '{"attribute_1":"Navy-blue"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (64, 'Fashion - KID''S FASHION - Reebok', '2025-06-30 20:31:14.902875+00', true, true, 0, 800, 0, 123, 'Children''s Summer Boys Sandals Non-slip Soft Sole', '2025-06-30 20:31:14.902875+00', NULL, NULL, 0, 'Size information: (1in=2.54cm)
Size 21(Insole 14.5cm), suitable for the foot length 13.5cm
Size 22(Insole 15.0cm), suitable for the foot length 14.0cm
Size 23(Insole 15.5cm), suitable for the foot length 14.5cm
Size 24(Insole 16.0cm), suitable for the foot length 15.0cm
Size 25(Insole 16.5cm), suitable for the foot length 15.5cm
Size 26(Insole 17.0cm), suitable for the foot length 16.0cm
Size 27(Insole 17.5cm), suitable for the foot length 16.5cm
Size 28(Insole 18.0cm), suitable for the foot length 17.0cm
Size 29(Insole 18.5cm), suitable for the foot length 17.5cm
Size 30(Insole 19.0cm), suitable for the foot length 18.0cm
Size 31(Insole 19.5cm), suitable for the foot length 18.5cm
Size 32(Insole 20.0cm), suitable for the foot length 19.0cm
Size 33(Insole 20.5cm), suitable for the foot length 19.5cm
Size 34(Insole 21.0cm), suitable for the foot length 20.0cm
Size 35(Insole 21.5cm), suitable for the foot length 20.5cm

Before ordering, Please measure your baby''s foot length and choose t', '    boys
    sandals
    non-slip
    soft sole
    summer', 'Fashion', 'KID''S FASHION', 'Reebok', 10, '{}', '{}', '{"attribute_1":"Black-white"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (65, 'Fashion - WOMEN''S CLOTHING - Curren', '2025-06-30 20:33:16.923031+00', true, true, 0, 1000, 0, 123, 'Dinner Gown For Ladies Women Office Skirt Casual Turkey Wears Dress', '2025-06-30 20:33:16.923031+00', NULL, NULL, 0, 'Dress Details

    Pattern: flower
    Craft : Printing
    Style: basic models
    Skirt length: long skirt
    Skirt type: princess dress
    Collar type: round neck
    Sleeve type: conventional sleeve
    Sleeve length: short sleeve
    Waist type: middle waist
    Popular elements: hollow
    Main fabric composition: polyester fiber (polyester)
    The concept is designed to suit the very desire of having most of our everyday motivations in a simple, handy, convenient, comfortable and easy to handle wear. It''s capable of bringing out a lot of vibe infact, all-in-one. It does well under any climatic condition and can be taken to any occasion serving the very purpose for which it is needed. It''s smart design and quality makes it top-notch, bringing it to a realm of trend and class that is going to be up there for the long run. The design is to suit the very desire of having most of our rudimentary everyday on-the-go items in a simple, handy, convenient, comfortable and easy to handl', '    Main Material: Polyester Fibre
    Colour: Black
    Floral Print Dress
    Fit: Smart
    Style: Formal', 'Fashion', 'WOMEN''S CLOTHING', 'Curren', 10, '{}', '{}', '{"attribute_1":"black white"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (66, 'Fashion - WOMEN''S CLOTHING - Curren', '2025-06-30 20:36:07.888368+00', true, true, 0, 3000, 0, 123, 'Fashion And Style Ladies Fashion Official Shift Dress- Navy Blue', '2025-06-30 20:36:07.888368+00', NULL, NULL, 0, 'This  long sleeved cute shift dress is free and good for many occasions, a pregnant mother can also wear it, Its an all season wear. The material is very comfortable for any size of woman, Its can be worn by all female ages as it fits old and young.  
It is perfect for a  day at the office, or weekend party, Good and easy for breastfeeding mums, Its free design  makes it perfect for women who are pregnant.
Place your order online on Jumia Kenya and have it delivered to your doorstep today. Please give us your reviews after your order.

Follow our store here in Jumia for Original Clothes and Amazing deals!

Happy Shopping. ', '    Fits all body type
    High quality material
    Affordable
    It''s Classy ', 'Fashion', 'WOMEN''S CLOTHING', 'Curren', 15, '{}', '{}', '{"attribute_1":"Nvy-Blue"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (67, 'Fashion - MEN''S SHOES - Bata', '2025-06-30 20:38:55.698877+00', true, true, 0, 800, 0, 123, 'Men''s Soft Sole Leather Shoes Casual Slip-Ons Formal Shoes - Black', '2025-06-30 20:38:55.698877+00', NULL, NULL, 0, '    Black color
    Casual style
    Applicable gender: male
    Design: solid color
    Upper Material: PU
    Toe tip shape: round toe
    Heel height: low heel (1-3 cm)
    Function: Breathable
    Style: single shoe
    Sole material: plastic
    Suitable for sports: universal
    Wear: lacing front
    Heel shape: flat
    Inner Material:PU
    Application Scenario: Leisure
    Top height: low stem
    Sole technology: injection shoes
    Insole material: EVA
    Note: Please select the dimension according to the dimension drawing', '    Style: single shoe
    Sole material: plastic
    Suitable for sports: universal
    Wear: lacing front
    Heel shape: flat
    Inner Material:PU
    Application Scenario: Leisure
    Top height: low stem
    Sole technology: injection shoes
    Insole material: EVA
    Note: Please select the dimension according to the dimension drawing', 'Fashion', 'MEN''S SHOES', 'Bata', 10, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (68, 'Fashion - WOMEN''S SHOES - Curren', '2025-06-30 20:41:43.913491+00', true, true, 0, 1300, 0, 123, 'Stylish Ladies Leather Sandals', '2025-06-30 20:41:43.913492+00', NULL, NULL, 0, 'These are Maasai-inspired sandals are handmade with leather and adorned with colorful beads. These beautiful sandals are great for casual days like the weekends, Wear them for a stroll in the city or a walk on the beach. This sandal is sure to match all your outfits.  Order them from here and get them delivered to your door step by Jumia.', 'Material: leather
    Sole: rubber
    Style: casual
    Heel: flat slight raised heel
    Color: brown/tan/white
    Design: flip flop
    Completed with a tough rubber sole for durability
    Locally handmade in Kenya', 'Fashion', 'WOMEN''S SHOES', 'Curren', 10, '{}', '{}', '{"attribute_1":"Brown"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (69, 'Computing - COMPUTERS and ACCESSORIES - Dell Laptops', '2025-06-30 20:52:11.740674+00', true, true, 0, 500, 0, 123, '2.4G Wireless Gaming Mouse RGB Rechargeable Mice Silent Mouse', '2025-06-30 20:52:11.740674+00', NULL, NULL, 0, '【Stable Bluetooth/2.4G Wireless Connection】- The gaming mouse supports dual-mode connection, and meet your need on different devices.Bluetooth mode: support Windows 8/10, Mac OS, iPad, or iPhone Series (NOTE: NOTE: It is required to update your system to iPad OS 13/ iOS 13 or Above and Turn on the “Assistive Touch” on the iPad/ iPhone: Setting - Accessibility - Assistive Touch for an iPad usage.) 2.4G Wireless Mode: just plug the USB receiver to your PC, no additional driver or software is needed.
【RGB 7-Color Breathing Backlit】- Designed with an RGB 7-color auto-switching breathing backlight mode, the wireless mouse can offer you a pretty cool visual feast when using it, especially at night. The RGB lights will auto turn off at sleep mode for power saving.
【Rechargeable Wireless Mouse & Power Saving】- Built-in rechargeable battery, easy charging by included USB cable. In addition, the mouse is equipped with advanced smart power-saving technology, the mouse will auto-enter sleep mode a', 'Product Type: Wireless Mouse
Number of keys: 6 keys
Button life: 20 million times
Key technology: Matte
Wire length: 1.5 meters
Lighting effect: 7-color breathing light
Voltage and current: 5V, ≤200mAh
DPI: 1200-2400-3600 DPI
Product weight: 165 soil 5g
Product size: 13.8*8.0*3.8mm
Wireless technology: 2.4GHZ
Wireless distance: 10m
Battery capacity: 500mAh (wireless version)
Charging time: 2.5 hours
Use time: 25 days
Compatible system: For Windows XP, Vista, Windows 7, ME, 2000 and Mac OS... or latest', 'Computing', 'COMPUTERS and ACCESSORIES', 'Dell Laptops', 10, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (70, 'Computing - COMPUTERS and ACCESSORIES - HP Laptops', '2025-06-30 20:54:23.93753+00', true, true, 0, 900, 0, 123, 'GREY ANTITHEFT LAPTOP BAG With USB Charging Port', '2025-06-30 20:54:23.93753+00', NULL, NULL, 0, 'Comfortable airflow back design with thick with high quality waterproof polyester material and dual metal zippers. Serve well as a professional laptop backpack. Adjustable padded shoulder straps for comfort and ergonomic support; breathable mesh back panels for comfortable carrying. Luggage strap for easy access to suitcase rails. Reinforced dual top handles for easy carrying. It’s a great traveling laptop backpack for men women student.

Travel laptop backpack provides space for 15.6-inch laptop, as well as 15.6'''' Inch,14 Inch and 13 Inch macbook/laptop. Large compartment offers a series of organizer pockets to hold travel items, headphones, clothes camera, power bank, books. Dedicated front small items compartment and two side water bottle pockets. Anti-theft back zipper pocket for wallet, cards. Makes your items organized and easier to find.
The travel business backpack offers great convenience for charging your phone. Connect your own cable to the USB charger port outside and use t', '    COMFY&STURDY
    LARGE CAPACITY
     
    USB PORT DESIGN
     
    MULTIPURPOSE BACKPACK
    Premium Waterproof', 'Computing', 'COMPUTERS and ACCESSORIES', 'HP Laptops', 10, '{}', '{}', '{"attribute_1":"Grey"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (71, 'Computing - COMPUTERS and ACCESSORIES - Lenovo Laptops', '2025-06-30 20:56:46.080604+00', true, true, 0, 400, 0, 123, 'EAGEAT Metal Foldable Laptop Tablet Stand', '2025-06-30 20:56:46.080604+00', NULL, NULL, 0, '    Feature:
    【WIDE COMPATIBILITY】- Fits for Mac Stand is compatible with all laptop models and sizes from 10-17.3 inches, such as Tablet, MacBook, MacBook Air, Mac book Pro, Microsoft Surface, Google Pixel book, Dell XPS, HP, ASUS, Lenovo, Acer, Chromebook and more
    【Foldable & Portable Design】– This portable folding stand weighs only 0.3 kg. Collapsible small size, Amazing construction. makes it ideal to carry, you can put it in backpack or laptop bag.
    【ERGONOMIC DESIGN】- 6 Adjustable Ergonomics Levels - You can set multiple angles (maximum 5.34 "minimum 1.35") and the line of sight varies with the angle adjustment. This helps correct posture, relieve neck and back pain, wrist pain and eyestrain.
    【Steadiness & Durability】Made of premium aluminium alloy makes the laptop riser more sturdy; Non-skid pads keep the notebook riser stable and protects your device/desktop surface once placed on.
    【Ventilated and Dissipated】- It is good for ventilating and can also be used as', '    Weight: about 300G

    Max loading: 40KG

    6 Heights adjustable range: from 5.5cm to 15.5cm.

    Color:  silver

    Material: Aluminum alloy

    Gears:6

    Application:Laptop/Notbook/Tablet/iPad/Smart phones', 'Computing', 'COMPUTERS and ACCESSORIES', 'Lenovo Laptops', 12, '{}', '{}', '{"attribute_1":"Grey"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (72, 'Computing - LAPTOPS - HP Laptops', '2025-06-30 20:58:52.633983+00', true, true, 0, 135000, 0, 123, 'HP New All-in-One 27-cr0155nh PC, Intel Core I7 1355U, 8GB DDR4 3200, 512GB PCIe NVMe M.2 SSD, FreeDOS, 27" FHD', '2025-06-30 20:58:52.633983+00', NULL, NULL, 0, 'HP All-in-One 27-cr0155nh PC is Designed to Reduce Environmental Impact


The HP All-in-One 27-cr0155nh PC is not just powerful, it’s also eco-friendly. As the world’s first PC made with recycled coffee grounds and containing post-consumer recycled and ocean-bound plastics, it sets a new standard for sustainable technology. You can enjoy top-tier performance while also contributing to a cleaner, greener planet.
HP All-in-One 27-cr0155nh PC is  Built to Keep You Connected


Collaboration is at the core of the HP All-in-One 27-cr0155nh. With a tiltable, pop-up privacy camera and dual microphones with advanced noise-reduction technology, this PC is designed to enhance video calls and meetings, ensuring clear communication and privacy when needed. Whether you''re connecting with colleagues, friends, or family, this AIO keeps you engaged and in control.
HP All-in-One 27-cr0155nh PC is Ready to Take on the Day, Every Day


The HP All-in-One 27-cr0155nh is built for performance. Powered by an ', '    Intel Core i7 1355U, 8GB DDR4 3200
    512GB PCIe NVMe M.2 SSD
    FreeDOS, 27" FHD Touch Scree
    No ODD, Realtek Wi-Fi 6 (1x1) and Bluetooth 5.3 wireless card (supporting gigabit data rate)
    HP True Vision 720p HD tilt privacy camera with temporal noise reduction and integrated dual array digital microphones Dual 2W Speakers
    HP 125 Black Wired Keyboard and Mouse Combo
    Jet Black
    1 Year Warranty from Seller
    Rear Ports: One USB Type-C 5Gbps signaling rate, Two USB Type-A 5Gbps signaling rate, Two USB 2.0 Type-A, One headphone/microphone combo, One RJ-45, One HDMI-out 1.4', 'Computing', 'LAPTOPS', 'HP Laptops', 10, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (73, 'Computing - LAPTOPS - Lenovo Laptops', '2025-06-30 21:01:02.27802+00', true, true, 0, 10500, 0, 123, 'Lenovo Thinkpad Yoga 11e - Intel Processor, 4GB RAM, 128GB SSD, Touchscreen X360, Windows 10 Refurbished 6months Warranty', '2025-06-30 21:01:02.27802+00', NULL, NULL, 0, 'Looking for a compact, durable, and affordable laptop for school, work, or everyday tasks? The Lenovo Yoga 11e is the perfect choice. Built with rugged reliability, this lightweight convertible laptop delivers performance and flexibility at a great price.

Featuring a responsive touchscreen display, fast 128GB SSD storage, and efficient 4GB RAM, the Yoga 11e is ideal for students, teachers, office users, and anyone who wants portability without sacrificing quality.

With its 360-degree hinge, you can use it as a laptop, tablet, tent, or stand mode—perfect for watching videos, writing notes, or browsing online. It also comes pre-installed with Windows 10 , making it easy to get started right away.

Whether you''re in a classroom, coffee shop, or office, the Lenovo Yoga 11e is your everyday productivity companion.', '    ✅ Key Features
    ???? Convertible Design – Use it as a laptop or tablet (360° hinge)
    ⚡ 128GB SSD – Faster boot time and data access than traditional HDD
    ???? 4GB DDR3 RAM – Smooth multitasking for school or office work
    ????️ 11.6” HD Touchscreen – Intuitive and interactive use
    ???? Rugged Build – Designed for durability and mobility
    ???? Windows 10  – Pre-installed with professional features', 'Computing', 'LAPTOPS', 'Lenovo Laptops', 10, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (74, 'Computing - COMPUTER DATA STORAGE - HP Laptops', '2025-06-30 21:03:52.691052+00', true, true, 0, 450, 0, 123, 'GUEETON 128GB Metal OTG Usb Flash Drive Waterproof 3D Embossment', '2025-06-30 21:03:52.691052+00', NULL, NULL, 0, '    128GB metal Usb Flash Drive 3D embossment+micro Usb + Type C usb
    ·  Support USB version 2.0 
    ·  Capacity: 64GB
    ·  Hot Plug & Play
    ·  Durable solid-state storage
      No external power is required 4.5V ~ 5.5V from USB port
     Compatible with USB 1.1/2.0
      Operating Temp: -10 to +55Deg.C
      Storage Temp: -20 to +55Deg.C
      Life:>1 million times
      Read Rate: 12Mb-18Mb/S    Write Rate: 5-10 Mb/S
      Excellent USB Memory stick in excellent condition
    Why the USB flash drive real capacity is not correct capacity? 
     
    Vendors are using Flash memory decimal arithmetic: 1 MB = 1000KB, 1G = 1000 MB
    Calculated, operating system with binary arithmetic: 1 MB = 1024KB, 1 GB = 1024 MB;
    So there are some differences between display capacity and nominal capacity of flash memory products
     About Real capacity:
     32GB = approximately 28.5GB-30GB
     64GB = approximately 58.5GB-60GB
     128GB = approximately 110GB-124GB', '    128GB metal Usb Flash Drive 3D embossment+micro Usb + Type C usb

    Support USB version 2.0 
    Capacity: 128GB
    Hot Plug & Play
    Durable solid-state storage
    No external power is required 4.5V ~ 5.5V from USB port
    Compatible with USB 1.1/2.0
    Operating Temp: -10 to +55Deg.C
    Storage Temp: -20 to +55Deg.C
    Life:>1 million times
    Read Rate: 12Mb-18Mb/S    Write Rate: 5-10 Mb/S
    Excellent USB Memory stick in excellent condition', 'Computing', 'COMPUTER DATA STORAGE', 'HP Laptops', 10, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (75, 'Computing - COMPUTERS and ACCESSORIES - Asus Laptops', '2025-06-30 21:05:52.689294+00', true, true, 0, 2000, 0, 123, 'Replacement Battery CQ42 For HP Pavilion DM4 DV3 DV5 DV6 DV7', '2025-06-30 21:05:52.689294+00', NULL, NULL, 0, 'This Laptop Battery will ensure you have enough power to run your basic apps for hours without having to be in the power outlets. In addition, it has been rigorously tested to conform to all standards to ensure its durability and performance.

Compatible Model:HP 2000 Notebook PC Series / HP Compaq Presario CQ32 CQ42 CQ43 CQ56 CQ57 CQ62 CQ72 Series / HP Pavilion G4 G6 G7 G32 G42 G56 G62 G72 Series / HP Pavilion DM4 DV3 DV5 DV6 DV7 Series
Compatible Part Number: MU06 MU09 593553-001 593554-001 593550-001 593562-001 586006-321 586006-361 586007-541 586028-341 588178-141 HSTNN-YB0X HSTNN-Q64C HSTNN-Q63C HSTNN-Q62C HSTNN-Q61C HSTNN-Q60C HSTNN-Q51C HSTNN-Q50C HSTNN-Q49C HSTNN-Q48C HSTNN-Q47C HSTNN-OB0Y HSTNN-OB0X HSTNN-IB1E HSTNN-IBOX HSTNN-IB0N HSTNN-I84C HSTNN-I83C HSTNN-LBOW HSTNN-F02C HSTNN-F01C HSTNN-CB0X HSTNN-CB0W HSTNN-181C HSTNN-179C HSTNN-178C GSTNN-Q62C NBP6A174 NBP6A174B1 NBP6A175 NBP6A175B1 WD548AA WD549AA', '    Surge protection
    Over-current protection
    Voltage protection
    Over-temperature protection.', 'Computing', 'COMPUTERS and ACCESSORIES', 'Asus Laptops', 10, '{}', '{}', '{"attribute_1":"Black"}', NULL, NULL, NULL);
INSERT INTO public.products (id, category, created_at, is_active, is_approved, like_count, price, purchase_count, seller_id, title, updated_at, video_duration, video_type, view_count, details, specifications, major_category, subcategory, brand, product_quantity, images, videos, attributes, camera_features, description, what_is_in_the_box) VALUES (76, 'Computing - COMPUTER DATA STORAGE - Apple Laptops', '2025-06-30 21:09:16.49316+00', true, true, 0, 3000, 0, 123, 'USB C Hub, 7-in-1 USB C Adapter with 4K HDMI, USB 3.0 & USB 2.0, 100W PD, USB-C Ports, SD/TF Card Reader, USB C Docking Station for MacBook & More Type C Devices', '2025-06-30 21:09:16.49316+00', NULL, NULL, 0, '【7 in 1 docking station】: USB C hub with 2 USB-A ports & 1 USB-C ports (connecting the mouse, keyboard and other devices), 4K HDMI ultra output, 100W PD fast charging, SD/TF card slot supports a capacity of up to 512 GB.', '【7 in 1 docking station】: USB C hub with 2 USB-A ports & 1 USB-C ports (connecting the mouse, keyboard and other devices), 4K HDMI ultra output, 100W PD fast charging, SD/TF card slot supports a capacity of up to 512 GB.
【USB C HUB 4K HDMI】: The USB C hub can mirror or transfer images or videos with a resolution of up to 4K@30Hz via the HDMI port to a projector, monitor or HDTV, ideal for conference presentations or home theater.
【USB 3.0 Hub Fast Transfer】: The USB 3.0 port supports high-speed data transfer up to 5Gbps. Transfer files in seconds to increase office efficiency, compatible with SD and TF cards with capacities up to 2TB.
【100W PD Fast Charging】: The USB-C adapter has a high-quality aluminium housing and an improved cooling system to ensure better heat dissipation and a safer environment for use. The high-speed transmission will not damage your computer or connected devices.
【Dual Core Technology】: Equipped with an advanced dual core chip for lower power consumption and mo', 'Computing', 'COMPUTER DATA STORAGE', 'Apple Laptops', 10, '{}', '{}', '{"attribute_1":"Grey"}', NULL, NULL, NULL);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: pevu_user
--

SELECT pg_catalog.setval('public.products_id_seq', 76, true);


--
-- PostgreSQL database dump complete
--

