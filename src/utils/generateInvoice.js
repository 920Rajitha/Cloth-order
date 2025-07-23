import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ FIXED HERE

export const generateInvoice = (formData, cartItems) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("🧾 DANA CLOTHING - Order Invoice", 14, 20);

  doc.setFontSize(12);
  doc.text(`Name: ${formData.name}`, 14, 30);
  doc.text(`Contact: ${formData.contact}`, 14, 36);
  doc.text(`Address: ${formData.address1}, ${formData.address2}`, 14, 42);
  doc.text(`Size: ${formData.size}`, 14, 48);
  doc.text(`Payment: ${formData.payment === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}`, 14, 54);

  const tableData = cartItems.map((item, i) => [
    i + 1,
    item.name,
    item.qty,
    `Rs. ${item.price}`,
  ]);

  // ✅ Use autoTable function (not doc.autoTable)
  autoTable(doc, {
    head: [['#', 'Product', 'Qty', 'Price']],
    body: tableData,
    startY: 60,
  });

  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.qty * parseFloat(item.price.replace(/[^\d.]/g, '')),
    0
  );

  doc.text(`Total Items: ${totalQty}`, 14, doc.lastAutoTable.finalY + 10);
  doc.text(`Total Price: Rs. ${totalPrice.toLocaleString()}`, 14, doc.lastAutoTable.finalY + 16);

  doc.save(`Invoice_${formData.name.replace(/\s+/g, '_')}.pdf`);
};
