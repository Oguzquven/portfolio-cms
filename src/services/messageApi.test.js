import {afterEach,describe,expect,it,vi} from "vitest";
import {sendMessage} from "./messageApi";

describe("messageApi",()=>{
  afterEach(()=>vi.unstubAllGlobals());

  it("iletişim mesajını backend API'ye gönderir",async()=>{
    const response={id:"message-1",name:"Oğuz",email:"oguz@example.com",message:"Merhaba",read:false};
    const fetchMock=vi.fn().mockResolvedValue({ok:true,status:201,json:async()=>response});
    vi.stubGlobal("fetch",fetchMock);

    await expect(sendMessage({name:"Oğuz",email:"oguz@example.com",message:"Merhaba"})).resolves.toEqual(response);
    expect(fetchMock).toHaveBeenCalledWith("/api/messages",expect.objectContaining({
      method:"POST",
      body:JSON.stringify({name:"Oğuz",email:"oguz@example.com",message:"Merhaba"})
    }));
  });
});
