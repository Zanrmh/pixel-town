// Lượng tử hóa một mảng số, làm giảm độ chính xác của các giá trị để tiết kiệm dung lượng lưu trữ.
export function quantize(values: number[], precision: number) {
  const factor = 1 << precision;
  return values.map((v) => Math.floor(v * factor));
}
// Giải lượng tử hóa một mảng số, phục hồi độ chính xác ban đầu của các giá trị.
export function unquantize(quantized: number[], precision: number) {
  const reciprocal = 1 / (1 << precision);
  return quantized.map((q) => q * reciprocal);
}
// Mã hóa một mảng số bằng cách lưu trữ sự khác biệt giữa các giá trị liên tiếp, thường hiệu quả hơn đối với dữ liệu có sự thay đổi nhỏ giữa các giá trị.
export function deltaEncode(values: number[], initialValue = 0) {
  let prev = initialValue;
  const deltas = [];
  for (const value of values) {
    deltas.push(value - prev);
    prev = value;
  }
  return deltas;
}
// Giải mã một mảng số đã được mã hóa delta, phục hồi lại các giá trị ban đầu.
export function deltaDecode(deltas: number[], initialValue = 0) {
  let prev = initialValue;
  const values = [];
  for (const delta of deltas) {
    const value = prev + delta;
    values.push(value);
    prev = value;
  }
  return values;
}
// Mã hóa một mảng số bằng cách đếm số lần xuất hiện liên tiếp của các giá trị giống nhau, hiệu quả với dữ liệu có nhiều giá trị lặp lại.
export function runLengthEncode(values: number[]) {
  let hasPrevious = false;
  let previous = 0;
  let count = 0;
  const encoded = [];
  for (const value of values) {
    if (!hasPrevious) {
      previous = value;
      count = 1;
      hasPrevious = true;
      continue;
    }
    if (previous === value) {
      count += 1;
      continue;
    }
    encoded.push(previous, count);
    previous = value;
    count = 1;
  }
  if (hasPrevious) {
    encoded.push(previous, count);
  }
  return encoded;
}
// Giải mã một mảng số đã được mã hóa độ dài chạy, phục hồi lại các giá trị ban đầu.
export function runLengthDecode(encoded: number[]) {
  if (encoded.length % 2 !== 0) {
    throw new Error(`Invalid RLE encoded length: ${encoded.length}`);
  }
  const values = [];
  for (let i = 0; i < encoded.length; i += 2) {
    const value = encoded[i];
    const count = encoded[i + 1];
    for (let j = 0; j < count; j++) {
      values.push(value);
    }
  }
  return values;
}
