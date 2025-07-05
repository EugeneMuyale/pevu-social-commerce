import React from 'react';
import ProductDetailsDisplay from './ProductDetailsDisplay';

export default function SampleProductData() {
  const sampleDetails = `The Infinix GT 20 Pro 5G is a flagship gaming smartphone that combines cutting-edge technology with innovative design. This device is specifically engineered for gamers and power users who demand exceptional performance and immersive experiences.`;

  const sampleSpecifications = `General
Model: Infinix GT 20 Pro 5G
Dimensions: 164.3 x 75.4 x 8.2 mm
Weight: 194g
SIM: Dual SIM (Nano-SIM, dual stand-by)

Display
Type: AMOLED, 144Hz, 1300 nits peak brightness
Size: 6.78 inches
Resolution: 1080 x 2436 pixels
Refresh Rate: 144Hz

Performance
OS: Android 14, XOS 14
Chipset: Mediatek Dimensity 8200 Ultimate (4 nm)
CPU: Octa-core (1×3.1 GHz Cortex-A78 & 3×3.0 GHz Cortex-A78 & 4×2.0 GHz Cortex-A55)
GPU: Mali-G610 MC6

Storage
RAM: 12GB
Internal Storage: 256GB UFS 3.1
Expandable: Yes, dedicated MicroSD slot

Camera
Main Camera: 108 MP + 2 MP + 2MP triple setup
Selfie Camera: 32MP
Features: OIS, Quad-LED flash, HDR, panorama
Video: 1440p@30fps, 1080p@30/60fps

Battery
Capacity: 5,000mAh
Charging: 45W wired fast charging

Connectivity
Network: 5G enabled
Wi-Fi: Wi-Fi 6
Bluetooth: 5.3
NFC: Yes
USB: Type-C 2.0

Other
Sensors: Fingerprint (side-mounted), accelerometer, gyro, proximity, compass
Water Resistance: IP54 dust and splash resistance
Audio Jack: 3.5mm
Special Features: Customizable RGB LED back, Gaming Display Chip, Esports Mode, advanced cooling system, JBL-tuned audio, Hi-Res audio, infrared port

Box Contents
Phone, Free Buds, 45W Charger, USB Type-C Cable, Protective Case, User Manual

USPs

Design: The phone features a customizable RGB LED back and a sleek design with IP54 dust and splash resistance.
Display: It boasts a 6.78-inch AMOLED display with a 144Hz refresh rate and 1300 nits peak brightness, ensuring vibrant and smooth visuals.
Performance: Powered by the MediaTek Dimensity 8200 Ultimate chipset, the Infinix GT 20 Pro 5G is designed for high performance, especially in gaming. It features advanced algorithms like MAGT and AI-VRS for enhanced gaming power. 1080 x 2436 pixels is decent enough for a handset within this price range.
Camera: It comes with a 108 MP main camera with OIS, a 2 MP macro camera, and a 2 MP depth sensor. The front camera is 32 MP, perfect for high-quality selfies.
Audio: Tuned by JBL, it offers Hi-Res audio for an enhanced listening experience
Gaming Features: The GT 20 Pro includes a dedicated Gaming Display Chip, Esports Mode, and an advanced cooling system to maintain performance during intense gaming sessions.
Connectivity: It supports 5G, Wi-Fi 6, NFC, and has an infrared port
Battery and Charging: Equipped with a 5,000 mAh battery and 45W fast charging, it ensures long-lasting usage and quick recharges.

Available Colors: Mecha Blue, Mecha Orange, Mecha Silver`;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Sample Product: Infinix GT 20 Pro 5G</h1>
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-blue-600 mb-2">Ksh 45,999</div>
        <div className="text-green-600 font-semibold">In Stock: 15 units</div>
      </div>
      
      <ProductDetailsDisplay 
        details={sampleDetails}
        specifications={sampleSpecifications}
        category="Phones and Tablets - MOBILE PHONES - Infinix"
      />
    </div>
  );
} 