import { useAuth } from '../contexts/AuthContext';

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const { user, profile } = useAuth();

  const initiatePayment = async (amount: number, productDetails: { name: string, description: string }) => {
    try {
      // 1. Create order on backend
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const order = await response.json();

      if (!order.id) throw new Error('Failed to create order');

      // 2. Configure Razorpay
      const options: RazorpayOptions = {
        key: (import.meta as any).env.VITE_RAZORPAY_KEY_ID || '', 
        amount: order.amount,
        currency: order.currency,
        name: "Shringaara House Academy",
        description: productDetails.name,
        order_id: order.id,
        prefill: {
          name: profile?.name || user?.displayName || '',
          email: profile?.email || user?.email || '',
        },
        handler: async (response: any) => {
          // 3. Verify payment on backend
          const verificationResponse = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          const verificationResult = await verificationResponse.json();
          
          if (verificationResult.success) {
            alert('Payment Successful!');
            // Here you would typically trigger more logic (update Firestore, redirect, etc.)
          } else {
            alert('Payment verification failed');
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment failed to start');
    }
  };

  return { initiatePayment };
};
