import {afterEach,describe,expect,it,vi} from "vitest";
import {uploadMedia} from "./mediaApi";

const response=(body,status=200)=>({ok:status>=200&&status<300,status,json:vi.fn().mockResolvedValue(body)});

describe("mediaApi",()=>{
 afterEach(()=>vi.unstubAllGlobals());

 it("dosyayı multipart FormData olarak gönderir",async()=>{
  const fetchMock=vi.fn().mockResolvedValue(response({url:"/uploads/test.png",originalName:"test.png"},201));
  vi.stubGlobal("fetch",fetchMock);
  const file=new File(["image"],"test.png",{type:"image/png"});
  await expect(uploadMedia(file)).resolves.toMatchObject({url:"/uploads/test.png"});
  const[url,options]=fetchMock.mock.calls[0];
  expect(url).toBe("/api/media");
  expect(options.method).toBe("POST");
  expect(options.body).toBeInstanceOf(FormData);
  expect(options.body.get("file")).toBe(file);
  expect(options.headers).toBeUndefined();
 });

 it("backend hata mesajını kullanıcıya aktarır",async()=>{
  vi.stubGlobal("fetch",vi.fn().mockResolvedValue(response({message:"Dosya türü desteklenmiyor."},400)));
  const file=new File(["x"],"test.exe",{type:"application/octet-stream"});
  await expect(uploadMedia(file)).rejects.toThrow("Dosya türü desteklenmiyor.");
 });
});
