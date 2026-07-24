import { showToast } from "../showToast";

test("test show toast", () => {
    showToast("hello", 10, "error");
    expect(document.body.querySelector(".showToast")).not.toBe(null);
    showToast("hii", 7, "warning");
    expect(document.body.querySelector(".showToast")).not.toBe(null);
    showToast("hii", 7, "success");
    expect(document.body.querySelector(".showToast")).not.toBe(null);
    showToast("hii", 7, "info");
    expect(document.body.querySelector(".showToast")).not.toBe(null);
});
