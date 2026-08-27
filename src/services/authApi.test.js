import { afterEach, describe, expect, it, vi } from 'vitest';
import { getSession, login, logout } from './authApi';
const response=(body,status=200)=>({ok:status>=200&&status<300,status,json:vi.fn().mockResolvedValue(body)});
describe('authApi',()=>{afterEach(()=>vi.unstubAllGlobals());
 it('oturum bilgisini backendden ister',async()=>{const fetchMock=vi.fn().mockResolvedValue(response({authenticated:false}));vi.stubGlobal('fetch',fetchMock);await expect(getSession()).resolves.toEqual({authenticated:false});expect(fetchMock).toHaveBeenCalledWith('/api/auth/me');});
 it('giriş bilgilerini form encoded biçimde gönderir',async()=>{const fetchMock=vi.fn().mockResolvedValue(response({authenticated:true}));vi.stubGlobal('fetch',fetchMock);await login({email:'admin@portfolio.dev',password:'Admin123!'});const[,options]=fetchMock.mock.calls[0];expect(options.method).toBe('POST');expect(options.headers['Content-Type']).toBe('application/x-www-form-urlencoded');expect(options.body.toString()).toContain('username=admin%40portfolio.dev');expect(options.body.toString()).toContain('password=Admin123%21');});
 it('backend hata mesajını kullanıcıya aktarır',async()=>{vi.stubGlobal('fetch',vi.fn().mockResolvedValue(response({message:'E-posta veya parola hatalı.'},401)));await expect(login({email:'x@y.com',password:'wrong'})).rejects.toThrow('E-posta veya parola hatalı.');});
 it('çıkış isteğini POST olarak gönderir',async()=>{const fetchMock=vi.fn().mockResolvedValue({ok:true,status:204});vi.stubGlobal('fetch',fetchMock);await logout();expect(fetchMock).toHaveBeenCalledWith('/api/auth/logout',{method:'POST'});});
});
